from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import cv2
import numpy as np
import os
import base64
import traceback

app = Flask(__name__)

# Allow CORS from frontend
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
     supports_credentials=True)

@app.after_request
def add_cors_headers(response):
    response.headers.setdefault("Access-Control-Allow-Origin", "*")
    response.headers.setdefault("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    response.headers.setdefault("Access-Control-Allow-Headers", "Content-Type, Authorization")
    return response

@app.errorhandler(Exception)
def handle_all_exceptions(e):
    traceback.print_exc()
    resp = jsonify({"error": "internal_server_error", "message": str(e)})
    resp.status_code = 500
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return resp

# ------------------------
# Global recognizer variables
# ------------------------
recognizer = None
label_reverse_map = {}

# ------------------------
# Preprocessing function
# ------------------------
def preprocess_face(img, size=(200, 200)):
    if len(img.shape) == 3:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img = cv2.resize(img, size)
    img = cv2.equalizeHist(img)
    return img

# ------------------------
# Create LBPH recognizer
# ------------------------
def create_recognizer():
    try:
        return cv2.face.LBPHFaceRecognizer_create()
    except AttributeError:
        try:
            return cv2.face.LBPHFaceRecognizer.create()
        except Exception:
            raise RuntimeError(
                "OpenCV 'face' module not found. "
                "Install opencv-contrib-python(-headless) and remove conflicting opencv-python packages."
            )

# ------------------------
# Train recognizer from all enrolled images
# ------------------------
def train_model():
    global recognizer, label_reverse_map
    recognizer = create_recognizer()
    faces = []
    labels = []
    label_map = {}
    current_label = 0

    if not os.path.exists("faces"):
        os.makedirs("faces")

    for person_usn in os.listdir("faces"):
        person_folder = os.path.join("faces", person_usn)
        if not os.path.isdir(person_folder):
            continue

        if person_usn not in label_map:
            label_map[person_usn] = current_label
            current_label += 1

        for img_file in os.listdir(person_folder):
            img_path = os.path.join(person_folder, img_file)
            img = cv2.imread(img_path, cv2.IMREAD_COLOR)
            if img is None:
                continue
            img = preprocess_face(img)
            faces.append(img)
            labels.append(label_map[person_usn])

    if len(faces) == 0:
        recognizer = None
        label_reverse_map = {}
        return

    recognizer.train(faces, np.array(labels))
    label_reverse_map = {v: k for k, v in label_map.items()}

# ------------------------
# Enroll a new student
# ------------------------
@app.route("/enroll", methods=["POST", "OPTIONS"])
def enroll():
    if request.method == "OPTIONS":
        return make_response(('', 204))
    
    data = request.get_json()
    usn = data["usn"]
    image_data = data["image"].split(",")[1]
    image_bytes = base64.b64decode(image_data)
    np_arr = np.frombuffer(image_bytes, np.uint8)
    face_img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    face_img = preprocess_face(face_img)

    student_folder = os.path.join("faces", usn)
    os.makedirs(student_folder, exist_ok=True)

    img_count = len(os.listdir(student_folder))
    img_name = f"{img_count + 1}.jpg"
    img_path = os.path.join(student_folder, img_name)
    cv2.imwrite(img_path, face_img)

    # Retrain recognizer after enrollment
    train_model()

    return jsonify({"message": f"Student {usn} enrolled successfully!"})

# ------------------------
# Face recognition
# ------------------------
@app.route("/recognize", methods=["POST", "OPTIONS"])
def recognize():
    if request.method == "OPTIONS":
        return make_response(('', 204))

    if recognizer is None:
        return jsonify({"usn": "No trained faces available"}), 400

    data = request.get_json()
    if not data or "image" not in data:
        return jsonify({"usn": "No image provided"}), 400

    image_data = data["image"].split(",")[1]
    image_bytes = base64.b64decode(image_data)
    np_arr = np.frombuffer(image_bytes, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    matches = []
    for (x, y, w, h) in faces:
        face_img = gray[y:y+h, x:x+w]
        face_img = preprocess_face(face_img)
        label, confidence = recognizer.predict(face_img)
        usn = label_reverse_map.get(label, "Unknown")
        matches.append({"usn": usn, "confidence": int(confidence)})

    if matches:
        # Return the best match (lowest confidence = better)
        best_match = min(matches, key=lambda m: m["confidence"])
        return jsonify(best_match)

    return jsonify({"usn": "No face detected"})

# ------------------------
# Run Flask app
# ------------------------
if __name__ == "__main__":
    if not os.path.exists("faces"):
        os.makedirs("faces")
    train_model()  # Initial training if faces exist
    app.run(host="0.0.0.0", port=5000, debug=True)

import { useEffect, useRef, useState } from "react";
import axios from "axios";

const useFrontPageHook = (API_URL, FLASK_URL) => {
  const [recognizedName, setRecognizedName] = useState("Visitor(s) username will appear here.");
  const [recognizedStudentName, setRecognizedStudentName] = useState("Visitor(s) username will appear here");
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const guideCanvasRef = useRef(null);

  // Fetch students
  useEffect(() => {
    axios.get(`${API_URL}/api/students`)
      .then(res => setStudents(res.data))
      .catch(err => console.error("Error fetching students:", err));
  }, [API_URL]);

  // Get camera access
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => videoRef.current.srcObject = stream)
      .catch(err => console.error("Camera access error:", err));
  }, []);

  // Draw circular face guide
  useEffect(() => {
    const drawFaceGuide = () => {
        if (!guideCanvasRef.current) return;
        const canvas = guideCanvasRef.current;
        const ctx = canvas.getContext("2d");

        const { width, height } = canvas;
        const centerX = width / 2;
        const centerY = height / 2;
        const radiusX = 100;
        const radiusY = 120;

        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = "rgba(0, 0, 0, 0.69)";
        ctx.fillRect(0, 0, width, height);

        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.stroke();

        const crossSize = 20;
        ctx.beginPath();
        ctx.moveTo(centerX - crossSize, centerY);
        ctx.lineTo(centerX + crossSize, centerY);
        ctx.moveTo(centerX, centerY - crossSize);
        ctx.lineTo(centerX, centerY + crossSize);
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.stroke();

        requestAnimationFrame(drawFaceGuide);
    };

    drawFaceGuide();
    }, []);

  const handleRecognize = async () => {
    setIsLoading(true);
    const canvas = canvasRef.current;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg");

    try {
        const { data } = await axios.post(`${FLASK_URL}/recognize`, { image: imageData });
        setRecognizedName(data.usn);

        const matchedStudent = students.find(s => s.usn === data.usn);
        setRecognizedStudentName(matchedStudent?.name || "Not found");

        // show if nagmatch
        if (matchedStudent) console.log("Recognition Match:", data);

        const recognizedAt = new Date().toISOString();
        const period = getCurrentPeriod();
        if (period === "No Period") {
        console.log("Attendance cannot be recorded outside of class periods.");
        return;
        }

        try {
        const res = await axios.post(`${API_URL}/api/periodwise-attendance`, { usn: data.usn, recognizedAt });
        alert(res.data.message);
        console.log(`${period} attendance successfully recorded.`);
        } catch (err) {
        alert(err.response?.data?.message || "Something went wrong");
        console.error("Failed to record attendance.");
        }

    } catch (err) {
        console.error(err);
        setRecognizedName("Error recognizing");
        setRecognizedStudentName("Recognition failed");
        console.error("Error in recognition or attendance.");
    } finally {
        setIsLoading(false);
    }
    };

  const getCurrentPeriod = () => {
    const now = new Date();
    const periods = [
      { start: 9, end: 10, name: "Java" },
      { start: 10, end: 11, minStart: 10, name: "Python" },
      { start: 11, end: 12, minStart: 20, name: "Networking" },
      { start: 12, end: 13, minStart: 30, name: "AI/ML" },
      { start: 18, end: 19, minStart: 30, name: "React" }
    ];

    const h = now.getHours(), m = now.getMinutes();
    for (let p of periods) {
      if (h === p.start && (!p.minStart || m >= p.minStart)) return p.name;
      if (h > p.start && h < p.end) return p.name;
    }
    return "No Period";
  };

  return { recognizedName, recognizedStudentName, isLoading, videoRef, canvasRef, guideCanvasRef, handleRecognize };
};

export default useFrontPageHook;

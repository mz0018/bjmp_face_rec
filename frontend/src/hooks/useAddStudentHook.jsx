import { useState, useRef, useEffect } from "react";
import axios from "axios";

const useAddStudentHook = (API_URL) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [student, setStudent] = useState({
        name: '',
        usn: '',
        age: '',
        course: '',
        phone: ''
    });

    useEffect(() => {
        const getCameraStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch (err) {
                console.error("Error accessing webcam: ", err);
            }
        };

        getCameraStream();

        return () => {
            videoRef.current?.srcObject?.getTracks().forEach(track => track.stop());
        };
    }, []);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const captureAndSend = async () => {
        const { name, usn, age, course, phone } = student;

        if (!name || !usn || !age || !course || !phone) {
            alert("Please fill in all student details.");
            return;
        }

        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas) {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = canvas.toDataURL('image/jpeg');

            try {
                // Send face to recognition backend
                const { data: faceResult } = await axios.post("http://localhost:5000/enroll", { usn, image: imageData });
                alert(faceResult.message);

                // Save student info in DB
                const { data: studentResult } = await axios.post(`${API_URL}/api/students`, student);
                console.log("Student DB response:", studentResult.message);

                alert("Student enrolled successfully!");
                setStudent({ name: '', age: '', course: '', phone: '', usn: '' });

            } catch (err) {
                console.error(err);
                alert(err.response?.data?.message || "Failed to enroll face.");
            }
        }
    };

    return {
        student,
        videoRef,
        canvasRef,
        handleChange,
        captureAndSend
    };
};

export default useAddStudentHook;

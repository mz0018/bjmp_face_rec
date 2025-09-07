import { useState, useEffect } from "react";
import axios from "axios";

const useDashboardHook = (API_URL) => {
    const [attendance, setAttendance] = useState([]);
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(4);
    const [selectedCourse, setSelectedCourse] = useState("All");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [attendanceRes, studentsRes] = await Promise.all([
                    axios.get(`${API_URL}/api/attendance`),
                    axios.get(`${API_URL}/api/students`),
                ]);
                setAttendance(attendanceRes.data);
                setStudents(studentsRes.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };
        fetchData();
    }, [API_URL]);

    const today = new Date().toISOString().split("T")[0];
    const presentToday = attendance.filter(
        (student) => new Date(student.recognizedAt).toISOString().split("T")[0] === today
    );

    const totalStudents = students.length;
    const absentStudents = totalStudents - presentToday.length;

    const courseList = ["All", ...new Set(attendance.map((student) => student.course))];
    const filteredAttendance =
        selectedCourse === "All"
            ? attendance
            : attendance.filter((student) => student.course === selectedCourse);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAttendance = filteredAttendance.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleManualAttendance = async (manualData) => {
        try {
            const res = await axios.post(`${API_URL}/api/attendance`, manualData);
            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return {
        attendance,
        students,
        presentToday,
        totalStudents,
        absentStudents,
        courseList,
        filteredAttendance,
        currentAttendance,
        currentPage,
        itemsPerPage,
        selectedCourse,
        setSelectedCourse,
        paginate,
        handleManualAttendance,
    };
};

export default useDashboardHook;

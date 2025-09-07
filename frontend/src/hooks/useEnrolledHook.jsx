// useEnrolledHook.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const useEnrolledHook = (API_URL) => {
  const [students, setStudents] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch students and attendance logs
  useEffect(() => {
    const fetchStudentsAndAttendance = async () => {
      try {
        const [studentsRes, attendanceRes] = await Promise.all([
          axios.get(`${API_URL}/api/students`),
          axios.get(`${API_URL}/api/attendance`)
        ]);
        setStudents(studentsRes.data);
        setAttendanceLogs(attendanceRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchStudentsAndAttendance();
  }, [API_URL]);

  const todayDate = new Date().toISOString().split("T")[0];

  const getAttendanceStatus = (usn) => {
    const hasLogToday = attendanceLogs.some(log => {
      const logDate = new Date(log.recognizedAt).toISOString().split("T")[0];
      return log.usn === usn && logDate === todayDate;
    });
    return hasLogToday ? "Present" : "Absent";
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (!query) {
      setFilteredSuggestions([]);
    } else {
      const suggestions = students.filter(student => {
        const nameMatch = student.name?.toLowerCase().includes(query);
        const usnMatch = student.usn?.toLowerCase().includes(query);
        return nameMatch || usnMatch;
      });
      setFilteredSuggestions(suggestions);
    }
  };

  const handleSuggestionClick = (student) => {
    setSelectedStudent(student);
    setSearch('');
    setFilteredSuggestions([]);
  };

  const closeModal = () => setSelectedStudent(null);

  return {
    students,
    search,
    filteredSuggestions,
    selectedStudent,
    getAttendanceStatus,
    handleSearchChange,
    handleSuggestionClick,
    closeModal
  };
};

export default useEnrolledHook;

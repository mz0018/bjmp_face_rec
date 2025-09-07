import { useState, useEffect } from "react";

const usePeriodHook = (API_URL) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/periodwise-attendance`);
        const data = await response.json();
        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, [API_URL]);

  const filteredData = filter
    ? attendanceData.filter((log) => log.period === filter)
    : attendanceData;

  return {
    attendanceData,
    loading,
    filter,
    setFilter,
    filteredData,
  };
};

export default usePeriodHook;

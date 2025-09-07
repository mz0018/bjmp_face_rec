import React from "react";
import { Link } from "react-router-dom";
import usePeriodHook from "./hooks/usePeriodHook";

const Period = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { attendanceData, loading, filter, setFilter, filteredData } = usePeriodHook(API_URL);

  const periods = [
    { name: "Java", time: "9:00 AM" },
    { name: "Python", time: "10:00 AM" },
    { name: "Network", time: "11:30 AM" },
    { name: "AI/ML", time: "12:30 PM" },
    { name: "React", time: "6:30 PM" },
  ];

  return (
    <main>
      {/* Sidebar */}
      <aside>
        <h2>Admin Page</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/Addstudent">Add Students</Link></li>
            <li><Link to="/Enrolled">Enrolled</Link></li>
            <li><Link to="/Period">Period Wise</Link></li>
          </ul>
        </nav>
        <Link to="/signin"><button>Logout</button></Link>
      </aside>

      {/* Main Content */}
      <section>
        <header>
          <p>Pages / Period Wise</p>
          <h1>Student Attendance Period Wise</h1>
        </header>

        {/* Periods Overview */}
        <article>
          <h2>Periods Overview</h2>
          <ul>
            {periods.map((period) => {
              const count = attendanceData.filter((log) => log.period === period.name).length;
              return (
                <li key={period.name}>
                  <strong>{period.name}</strong> ({period.time}) - Attendance: {count}
                </li>
              );
            })}
          </ul>
        </article>

        {/* Filter */}
        <div>
          <label htmlFor="periodFilter">Filter by Period:</label>
          <select
            id="periodFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            {periods.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Attendance Table */}
        <article>
          <h2>Attendance Records</h2>
          <table border="1" cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>USN</th>
                <th>Period</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4">Loading attendance data...</td>
                </tr>
              ) : filteredData.length > 0 ? (
                filteredData.map((log, index) => (
                  <tr key={index}>
                    <td>{log.name}</td>
                    <td>{log.usn}</td>
                    <td>{log.period}</td>
                    <td>{new Date(log.recognizedAt).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No attendance records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </article>
      </section>
    </main>
  );
};

export default Period;

const AttendanceTable = ({ currentAttendance, selectedCourse, setSelectedCourse, courseList, currentPage, paginate, filteredAttendance }) => (
    <section>
        <h2>Logs of Student Attendance</h2>
        <label htmlFor="filter">Sort by Course:</label>
        <select
            id="filter"
            value={selectedCourse}
            onChange={(e) => {
                setSelectedCourse(e.target.value);
            }}
        >
            {courseList.map((course, idx) => (
                <option key={idx} value={course}>{course}</option>
            ))}
        </select>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>USN</th>
                    <th>Course</th>
                    <th>Timings</th>
                </tr>
            </thead>
            <tbody>
                {currentAttendance.length > 0 ? (
                    currentAttendance.map((student, index) => (
                        <tr key={index}>
                            <td>{student.name}</td>
                            <td>{student.usn}</td>
                            <td>{student.course}</td>
                            <td>{new Date(student.recognizedAt).toLocaleString()}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">No attendance logs available</td>
                    </tr>
                )}
            </tbody>
        </table>

        <nav>
            <button onClick={() => currentPage > 1 && paginate(currentPage - 1)}>Prev</button>
            <span>Page {currentPage}</span>
            <button onClick={() => (currentPage * 4 < filteredAttendance.length) && paginate(currentPage + 1)}>Next</button>
        </nav>
    </section>
);

export default AttendanceTable;

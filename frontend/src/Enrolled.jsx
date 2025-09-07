import { Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaUser, FaDownload, FaClock } from 'react-icons/fa';
import useEnrolledHook from './hooks/useEnrolledHook';

const Enrolled = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const {
    students,
    search,
    filteredSuggestions,
    selectedStudent,
    getAttendanceStatus,
    handleSearchChange,
    handleSuggestionClick,
    closeModal
  } = useEnrolledHook(API_URL);

  return (
    <main>
      {selectedStudent && (
        <dialog open>
          <h2>Student Details</h2>
          <button onClick={closeModal} aria-label="Close">&times;</button>
          <p><strong>Name:</strong> {selectedStudent.name}</p>
          <p><strong>USN:</strong> {selectedStudent.usn}</p>
          <p><strong>Age:</strong> {selectedStudent.age}</p>
          <p><strong>Course:</strong> {selectedStudent.course}</p>
          <p><strong>Phone:</strong> {selectedStudent.phone}</p>
          <p><strong>Enrolled At:</strong> {new Date(selectedStudent.enrolledAt).toLocaleDateString()}</p>
        </dialog>
      )}

      <aside>
        <h2>Admin Page</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard"><FaHome /> Home</Link></li>
            <li><Link to="/Addstudent"><FaUser /> Add Students</Link></li>
            <li><Link to="/Enrolled"><FaFileAlt /> Enrolled</Link></li>
            <li><Link to="/Period"><FaClock /> Period Wise</Link></li>
          </ul>
        </nav>
        <Link to="/signin"><button><FaDownload /> Logout</button></Link>
      </aside>

      <section>
        <header>
          <p>Pages / Enrolled</p>
          <h1>Enrolled Students</h1>
        </header>

        <div>
          <label htmlFor="search">Search Student:</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name or USN"
            value={search}
            onChange={handleSearchChange}
          />
          {filteredSuggestions.length > 0 && (
            <ul>
              {filteredSuggestions.map(student => (
                <li key={student._id} onClick={() => handleSuggestionClick(student)}>
                  {student.name} ({student.usn})
                </li>
              ))}
            </ul>
          )}
        </div>

        <article>
          <h2>List of Enrolled Students</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>USN</th>
                <th>Age</th>
                <th>Course</th>
                <th>Phone</th>
                <th>Enrolled At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map(student => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.usn}</td>
                    <td>{student.age}</td>
                    <td>{student.course}</td>
                    <td>{student.phone}</td>
                    <td>{new Date(student.enrolledAt).toLocaleDateString()}</td>
                    <td>{getAttendanceStatus(student.usn)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No students enrolled.</td>
                </tr>
              )}
            </tbody>
          </table>
        </article>
      </section>
    </main>
  );
};

export default Enrolled;

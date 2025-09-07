import { Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaUser, FaDownload, FaClock } from 'react-icons/fa';
import useAddStudentHook from './hooks/useAddStudentHook';

const Addstudent = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { student, videoRef, canvasRef, handleChange, captureAndSend } = useAddStudentHook(API_URL);

    return (
        <main>
            {/* Sidebar */}
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
                <Link to="/signin">
                    <button><FaDownload /> Logout</button>
                </Link>
            </aside>

            {/* Main Content */}
            <section>
                <header>
                    <h1>Register new Visitor</h1>
                </header>

                <article>
                    <h2>Student Details</h2>
                    <form>
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" name="name" value={student.name} onChange={handleChange} placeholder="Name" />

                        <label htmlFor="usn">USN</label>
                        <input id="usn" type="text" name="usn" value={student.usn} onChange={handleChange} placeholder="USN" />

                        <label htmlFor="age">Age</label>
                        <input id="age" type="text" name="age" value={student.age} onChange={handleChange} placeholder="Age" />

                        <label htmlFor="course">Course</label>
                        <input id="course" type="text" name="course" value={student.course} onChange={handleChange} placeholder="Course" />

                        <label htmlFor="phone">Phone</label>
                        <input id="phone" type="number" name="phone" value={student.phone} onChange={handleChange} placeholder="Phone" />
                    </form>

                    {/* Camera & Enroll Button */}
                    <div>
                        <section>
                            <video ref={videoRef} autoPlay muted />
                            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
                        </section>
                        <section>
                            <p>Please position your face properly</p>
                            <button onClick={captureAndSend}>Enroll Face</button>
                        </section>
                    </div>
                </article>
            </section>
        </main>
    );
};

export default Addstudent;

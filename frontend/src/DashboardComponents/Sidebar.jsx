import { Link } from "react-router-dom";
import { FaHome, FaFileAlt, FaUser, FaClock, FaDownload } from "react-icons/fa";

const Sidebar = () => (
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
);

export default Sidebar;

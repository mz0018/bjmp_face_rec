import { Link, useLocation } from "react-router-dom";
import { FaHome, FaFileAlt, FaUser, FaClock, FaDownload } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const navLinks = [
    { to: "/dashboard", label: "Home", icon: <FaHome /> },
    { to: "/Addstudent", label: "Add Visitors", icon: <FaUser /> },
    { to: "/Enrolled", label: "Visitors Log", icon: <FaFileAlt /> },
    // { to: "/Period", label: "Period Wise", icon: <FaClock /> },
  ];

  return (
    <aside className="bg-white w-64 h-full shadow-lg flex flex-col justify-between border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-xl font-bold text-[#0033A0] mb-6">Admin Panel</h2>

        <nav>
          <ul className="space-y-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#0033A0] text-white"
                        : "text-gray-700 hover:bg-[#D4AF37]/20 hover:text-[#0033A0]"
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="p-4">
        <Link
          to="/signin"
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#CE1126] text-white text-sm font-medium hover:bg-[#b20f20] transition-colors"
        >
          <FaDownload />
          Logout
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;

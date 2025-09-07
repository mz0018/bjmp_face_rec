import { Link } from "react-router-dom";
import { FaHome, FaFileAlt, FaUser, FaDownload, FaClock } from "react-icons/fa";
import Sidebar from "./DashboardComponents/Sidebar";
import useEnrolledHook from "./hooks/useEnrolledHook";

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
    closeModal,
  } = useEnrolledHook(API_URL);

  return (
    <main className="min-h-screen flex bg-gray-50">
      <aside className="w-64 hidden lg:block">
        <Sidebar className="h-full bg-white border-r border-gray-200" />
      </aside>

      <section className="flex-1 p-4 sm:p-6">
        <div className="flex items-center justify-between lg:hidden mb-4">
          <div>
            <p className="text-sm text-[#6B7280]">Pages / Enrolled</p>
            <h1 className="text-lg font-semibold text-[#0033A0]">Enrolled Visitors</h1>
          </div>
          <Link to="/dashboard" className="p-2 rounded-md border border-gray-200 bg-white">
            <FaHome className="w-5 h-5 text-gray-600" />
          </Link>
        </div>

        <header className="hidden lg:block mb-6">
          <p className="text-sm text-[#6B7280]">Pages / Enrolled</p>
          <h1 className="text-2xl font-bold text-[#0033A0]">Enrolled Visitors</h1>
          <p className="text-xs text-[#6B7280] mt-1">List of visitors and enrollment details</p>
        </header>

        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={closeModal}
              aria-hidden
            />
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 z-10">
              <button
                onClick={closeModal}
                aria-label="Close"
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>

              <h2 className="text-xl font-semibold text-[#0033A0] mb-3">Visitor Details</h2>
              <div className="text-sm text-[#6B7280] space-y-2">
                <p><strong>Name:</strong> <span className="font-medium text-gray-800">{selectedStudent.name}</span></p>
                <p><strong>ID/Ref:</strong> <span className="font-medium text-gray-800">{selectedStudent.usn}</span></p>
                <p><strong>Age:</strong> <span className="font-medium text-gray-800">{selectedStudent.age}</span></p>
                <p><strong>Purpose:</strong> <span className="font-medium text-gray-800">{selectedStudent.course}</span></p>
                <p><strong>Phone:</strong> <span className="font-medium text-gray-800">{selectedStudent.phone}</span></p>
                <p><strong>Registered At:</strong> <span className="font-medium text-gray-800">{new Date(selectedStudent.enrolledAt).toLocaleDateString()}</span></p>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={closeModal}
                  className="px-3 py-2 rounded-md border border-[#6B7280] text-[#6B7280]"
                >
                  Close
                </button>
                <Link to="/Enrolled" className="px-3 py-2 rounded-md bg-[#FFF1C2] text-[#0033A0]">
                  View on list
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Search / suggestions */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-[#0033A0]">Search Visitors</h2>
              <div className="flex items-center gap-2">
                <Link to="/Addstudent" className="px-3 py-1 rounded-md bg-[#FFF1C2] text-[#0033A0] text-sm">Add Visitor</Link>
                <Link to="/dashboard" className="px-3 py-1 rounded-md border border-[#0033A0] text-[#0033A0] text-sm">Back</Link>
              </div>
            </div>

            <div className="relative max-w-md">
              <label htmlFor="search" className="sr-only">Search Visitors</label>
              <input
                id="search"
                type="text"
                placeholder="Search by name or ID"
                value={search}
                onChange={handleSearchChange}
                className="w-full px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />

              {filteredSuggestions.length > 0 && (
                <ul className="absolute z-20 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-sm max-h-44 overflow-auto">
                  {filteredSuggestions.map((student) => (
                    <li
                      key={student._id}
                      onClick={() => handleSuggestionClick(student)}
                      className="px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
                    >
                      <span className="font-medium text-gray-800">{student.name}</span>
                      <span className="ml-2 text-xs text-[#6B7280]">({student.usn})</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Table */}
          <article className="bg-white rounded-lg shadow-sm p-4 overflow-x-auto">
            <h3 className="text-lg font-semibold text-[#0033A0] mb-3">List of Enrolled Visitors</h3>

            <table className="min-w-full table-auto text-sm">
              <thead>
                <tr className="text-left text-xs text-[#6B7280] border-b border-gray-200">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">ID/Ref</th>
                  <th className="py-2 px-3">Age</th>
                  <th className="py-2 px-3">Purpose</th>
                  <th className="py-2 px-3">Phone</th>
                  <th className="py-2 px-3">Date Registered</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {students && students.length > 0 ? (
                  students.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="py-2 px-3">{student.name}</td>
                      <td className="py-2 px-3">{student.usn}</td>
                      <td className="py-2 px-3">{student.age}</td>
                      <td className="py-2 px-3">{student.course}</td>
                      <td className="py-2 px-3">{student.phone}</td>
                      <td className="py-2 px-3">{new Date(student.enrolledAt).toLocaleDateString()}</td>
                      <td className="py-2 px-3">{getAttendanceStatus(student.usn)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-6 px-3 text-center text-sm text-[#6B7280]">
                      No visitors enrolled.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Enrolled;

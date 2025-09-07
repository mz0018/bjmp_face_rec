
const AttendanceTable = ({
  currentAttendance = [],
  selectedCourse,
  setSelectedCourse,
  courseList = [],
  currentPage = 1,
  paginate,
  filteredAttendance = [],
}) => {

  const courseKey = (course, idx) => {
    if (!course && course !== 0) return `course-${idx}`;
    if (typeof course === "string") return course;
    if (typeof course === "object") return course.id ?? course.name ?? `course-${idx}`;
    return `course-${idx}`;
  };

  const courseValue = (course, idx) => {
    if (!course && course !== 0) return `course-${idx}`;
    if (typeof course === "string") return course;
    if (typeof course === "object") return String(course.id ?? course.name ?? idx);
    return `course-${idx}`;
  };

  return (
    <section className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-[#0033A0]">Logs of Visitors Attendance</h2>
          <p className="text-xs text-[#6B7280]">Recent attendance entries</p>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="filter" className="sr-only">Sort by purpose</label>
          <select
            id="filter"
            value={selectedCourse ?? "all"}
            onChange={(e) => {
              const v = e.target.value;
              setSelectedCourse(v === "all" ? null : v);
            }}
            className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm"
          >
            <option key="all" value="all">All Courses</option>

            {courseList.map((course, idx) => (
              <option
                key={courseKey(course, idx)}
                value={courseValue(course, idx)}
              >
                {typeof course === "string" ? course : course.name ?? courseValue(course, idx)}
              </option>
            ))}
          </select>

          <div className="text-sm text-[#6B7280]">Page <span className="font-medium text-gray-800 ml-1">{currentPage}</span></div>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-100 rounded">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs text-[#6B7280]">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">ID/Ref</th>
              <th className="py-3 px-4">Purpose</th>
              <th className="py-3 px-4">Timings</th>
            </tr>
          </thead>

          <tbody>
            {currentAttendance && currentAttendance.length > 0 ? (
              currentAttendance.map((student, index) => {
                const rowKey = student._id ?? student.usn ?? `att-${index}`;
                const time = student.recognizedAt ? new Date(student.recognizedAt).toLocaleString() : "—";

                return (
                  <tr key={rowKey} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{student.name ?? "—"}</td>
                    <td className="py-3 px-4">{student.usn ?? "—"}</td>
                    <td className="py-3 px-4">{student.course ?? "—"}</td>
                    <td className="py-3 px-4">{time}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="py-6 px-4 text-center text-sm text-[#6B7280]">
                  No attendance logs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <nav className="mt-4 flex items-center justify-between">
        <button
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`px-3 py-2 rounded-md text-sm border ${
            currentPage <= 1 ? "border-gray-200 text-gray-400 cursor-not-allowed" : "border-[#0033A0] text-[#0033A0] hover:bg-[#0033A0]/5"
          }`}
          aria-disabled={currentPage <= 1}
        >
          Prev
        </button>

        <div className="text-sm text-[#6B7280]">Page <span className="font-medium text-gray-800">{currentPage}</span></div>

        <button
          onClick={() => (currentPage * 4 < (filteredAttendance?.length ?? 0)) && paginate(currentPage + 1)}
          disabled={currentPage * 4 >= (filteredAttendance?.length ?? 0)}
          className={`px-3 py-2 rounded-md text-sm border ${
            currentPage * 4 >= (filteredAttendance?.length ?? 0) ? "border-gray-200 text-gray-400 cursor-not-allowed" : "border-[#0033A0] text-[#0033A0] hover:bg-[#0033A0]/5"
          }`}
          aria-disabled={currentPage * 4 >= (filteredAttendance?.length ?? 0)}
        >
          Next
        </button>
      </nav>
    </section>
  );
};

export default AttendanceTable;

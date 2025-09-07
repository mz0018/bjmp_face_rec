import Sidebar from "./DashboardComponents/Sidebar";
import StatsCards from "./DashboardComponents/StatsCards";
import AttendanceTable from "./DashboardComponents/AttendanceTable";
import ManualAttendanceForm from "./DashboardComponents/ManualAttendanceForm";
import useDashboardHook from "./hooks/useDashboardHook";

const Dashboard = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const {
    presentToday,
    totalStudents,
    absentStudents,
    currentAttendance,
    courseList,
    selectedCourse,
    setSelectedCourse,
    currentPage,
    paginate,
    filteredAttendance,
    handleManualAttendance,
  } = useDashboardHook(API_URL);

  // Ensure presentToday and absentStudents are numbers
  const presentCount = Array.isArray(presentToday) ? presentToday.length : presentToday ?? 0;
  const absentCount = Array.isArray(absentStudents) ? absentStudents.length : absentStudents ?? 0;

  return (
    <main className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 hidden lg:block">
        <Sidebar className="h-full bg-white border-r border-gray-200" />
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-4 sm:p-6">
        {/* Mobile Topbar */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <div>
            <p className="text-sm text-[#6B7280]">Pages / Dashboard</p>
            <h1 className="text-lg font-semibold text-[#0033A0]">Dashboard</h1>
          </div>
          <button className="p-2 rounded-md border border-gray-200 bg-white">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Header */}
        <header className="hidden lg:flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-[#6B7280]">Pages / Dashboard</p>
            <h1 className="text-2xl font-bold text-[#0033A0]">Dashboard</h1>
            <p className="text-xs text-[#6B7280] mt-1">Visitors biometrics & attendance system</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              aria-label="Select purpose"
              value={selectedCourse ?? "all"}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option key="all" value="all">Purpose</option>
              {courseList?.map((c, idx) => (
                <option
                  key={c.id ?? c.code ?? c.name ?? `course-${idx}`}
                  value={String(c.id ?? c.code ?? c.name ?? idx)}
                >
                  {c.name ?? `Purpose ${idx + 1}`}
                </option>
              ))}
            </select>

            <input
              type="search"
              placeholder="Search visitor..."
              className="px-3 py-2 rounded-md border border-gray-200 w-44 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              aria-label="Search attendance"
            />

            <button
              onClick={() => {
                const el = document.getElementById("manual-attendance");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="px-4 py-2 rounded-md text-white font-medium bg-[#CE1126] hover:bg-[#b20f20] transition"
            >
              Manual Entry
            </button>
          </div>
        </header>

        {/* Stats */}
        <section className="mb-6">
          <StatsCards
            totalStudents={totalStudents ?? 0}
            presentToday={presentCount}
            absentStudents={absentCount}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          />
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left/Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-[#0033A0]">Attendance</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#6B7280] hidden sm:inline">Showing latest entries</span>
                  <button className="px-3 py-1 rounded-md border border-[#0033A0] text-[#0033A0] text-sm">Refresh</button>
                </div>
              </div>

              <AttendanceTable
                currentAttendance={currentAttendance}
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                courseList={courseList}
                currentPage={currentPage}
                paginate={paginate}
                filteredAttendance={filteredAttendance}
                className="w-full"
              />
            </div>

            <div id="manual-attendance" className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-md font-semibold text-[#0033A0] mb-2">Manual Attendance</h3>
              <ManualAttendanceForm handleManualAttendance={handleManualAttendance} />
            </div>
          </div>

          {/* Right Column */}
          <aside className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="text-sm font-semibold text-[#0033A0]">Summary</h4>
              <dl className="mt-3 text-sm text-[#6B7280]">
                <div className="flex justify-between py-2">
                  <dt>Total Visitors</dt>
                  <dd className="font-medium">{totalStudents ?? "—"}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt>Present Today</dt>
                  <dd className="font-medium text-[#1E90FF]">{presentCount}</dd>
                </div>
                <div className="flex justify-between py-2">
                  <dt>Absent</dt>
                  <dd className="font-medium text-[#CE1126]">{absentCount}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="text-sm font-semibold text-[#0033A0]">Quick Actions</h4>
              <p className="text-xs text-[#6B7280] mb-3">Common tasks for on-site personnel</p>
              <div className="flex flex-col gap-2">
                <button className="w-full px-3 py-2 rounded-md border border-[#0033A0] text-[#0033A0] text-sm">View Reports</button>
                <button className="w-full px-3 py-2 rounded-md text-white text-sm bg-[#CE1126] hover:bg-[#b20f20]">Export CSV</button>
                <button className="w-full px-3 py-2 rounded-md border border-[#6B7280] text-[#6B7280] text-sm">Settings</button>
              </div>
            </div>

            <div className="hidden lg:block rounded-lg p-4 bg-gradient-to-br from-[#FFF1C2] to-[#D4AF37] text-center">
              <p className="text-sm font-semibold text-[#0033A0]">BJMP Region-II</p>
              <p className="text-xs text-[#6B7280]">Rehabilitation & Service</p>
            </div>
          </aside>
        </div>

        <footer className="text-center text-sm text-[#6B7280] mt-6">© 2025, BJMP Visitors Biometrics</footer>
      </section>
    </main>
  );
};

export default Dashboard;

import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./DashboardComponents/Sidebar";
import usePeriodHook from "./hooks/usePeriodHook";

const Period = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { attendanceData = [], loading, filter, setFilter, filteredData = [] } = usePeriodHook(API_URL);

  const periods = [
    { name: "Java", time: "9:00 AM" },
    { name: "Python", time: "10:00 AM" },
    { name: "Network", time: "11:30 AM" },
    { name: "AI/ML", time: "12:30 PM" },
    { name: "React", time: "6:30 PM" },
  ];

  return (
    <main className="min-h-screen flex bg-gray-50">
      {/* Sidebar (desktop) */}
      <aside className="w-64 hidden lg:block">
        <Sidebar className="h-full bg-white border-r border-gray-200" />
      </aside>

      {/* Content */}
      <section className="flex-1 p-4 sm:p-6">
        {/* Mobile topbar */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <div>
            <p className="text-sm text-[#6B7280]">Pages / Period Wise</p>
            <h1 className="text-lg font-semibold text-[#0033A0]">Period Wise Attendance</h1>
          </div>
          <Link to="/dashboard" className="p-2 rounded-md border border-gray-200 bg-white">
            Home
          </Link>
        </div>

        {/* Header (desktop) */}
        <header className="hidden lg:block mb-6">
          <p className="text-sm text-[#6B7280]">Pages / Period Wise</p>
          <h1 className="text-2xl font-bold text-[#0033A0]">Student Attendance — Period</h1>
          <p className="text-xs text-[#6B7280] mt-1">Overview and filtered attendance records by period</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left / main */}
          <div className="lg:col-span-2 space-y-6">
            {/* Periods Overview */}
            <article className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-[#0033A0] mb-3">Periods Overview</h2>
              <ul className="space-y-2 text-sm text-[#6B7280]">
                {periods.map((period) => {
                  const count = (attendanceData || []).filter((log) => log.period === period.name).length;
                  return (
                    <li key={period.name} className="flex items-center justify-between border-b last:border-b-0 py-2">
                      <div>
                        <div className="font-medium text-gray-800">{period.name}</div>
                        <div className="text-xs text-[#6B7280]">{period.time}</div>
                      </div>
                      <div className="text-sm font-semibold text-[#0033A0]">{count}</div>
                    </li>
                  );
                })}
              </ul>
            </article>

            {/* Filter & table */}
            <article className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#0033A0]">Attendance Records</h3>

                <div className="flex items-center gap-3">
                  <label htmlFor="periodFilter" className="sr-only">Filter by period</label>
                  <select
                    id="periodFilter"
                    value={filter ?? ""}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] text-sm"
                  >
                    <option key="all" value="">All Periods</option>
                    {periods.map((p) => (
                      <option key={p.name} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-sm">
                  <thead>
                    <tr className="text-left text-xs text-[#6B7280] border-b border-gray-200">
                      <th className="py-2 px-3">Name</th>
                      <th className="py-2 px-3">ID/Ref</th>
                      <th className="py-2 px-3">Period</th>
                      <th className="py-2 px-3">Time</th>
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="py-6 px-3 text-center text-sm text-[#6B7280]">Loading attendance data...</td>
                      </tr>
                    ) : filteredData && filteredData.length > 0 ? (
                      filteredData.map((log, idx) => (
                        <tr key={log._id ?? `log-${idx}`} className="hover:bg-gray-50">
                          <td className="py-2 px-3">{log.name}</td>
                          <td className="py-2 px-3">{log.usn}</td>
                          <td className="py-2 px-3">{log.period}</td>
                          <td className="py-2 px-3">{new Date(log.recognizedAt).toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-6 px-3 text-center text-sm text-[#6B7280]">No attendance records found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </article>
          </div>

          {/* Right column */}
          <aside className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="text-sm font-semibold text-[#0033A0]">Quick Actions</h4>
              <p className="text-xs text-[#6B7280] mt-2">Navigate or manage attendance</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link to="/Addstudent" className="px-3 py-2 rounded-md border border-[#0033A0] text-[#0033A0] text-center">Add Visitor</Link>
                <Link to="/Enrolled" className="px-3 py-2 rounded-md bg-[#FFF1C2] text-[#0033A0] text-center">View Enrolled</Link>
                <Link to="/dashboard" className="px-3 py-2 rounded-md border border-[#6B7280] text-[#6B7280] text-center">Back to Dashboard</Link>
              </div>
            </div>

            <div className="hidden lg:block rounded-lg p-4 bg-gradient-to-br from-[#FFF1C2] to-[#D4AF37] text-center">
              <p className="text-sm font-semibold text-[#0033A0]">BJMP Region-IX</p>
              <p className="text-xs text-[#6B7280]">Rehabilitation & Service</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Period;

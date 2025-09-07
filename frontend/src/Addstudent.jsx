import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import useAddStudentHook from "./hooks/useAddStudentHook";
import Sidebar from "./DashboardComponents/Sidebar";

const Addstudent = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { student, videoRef, canvasRef, handleChange, captureAndSend } = useAddStudentHook(API_URL);

  return (
    <main className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <section className="flex-1 p-4 sm:p-6">
        {/* Mobile topbar */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <div>
            <p className="text-sm text-[#6B7280]">Pages / Add Visitor</p>
            <h1 className="text-lg font-semibold text-[#0033A0]">Register New Visitor</h1>
          </div>
          <Link to="/dashboard" className="p-2 rounded-md border border-gray-200 bg-white">
            <FaHome className="w-5 h-5 text-gray-600" />
          </Link>
        </div>

        {/* Header (desktop) */}
        <header className="hidden lg:block mb-6">
          <p className="text-sm text-[#6B7280]">Pages / Add Visitor</p>
          <h1 className="text-2xl font-bold text-[#0033A0]">Register New Visitor</h1>
          <p className="text-xs text-[#6B7280] mt-1">Capture visitor info and enroll face</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form card */}
          <article className="lg:col-span-2 bg-white rounded-lg shadow-sm p-5">
            <h2 className="text-lg font-semibold text-[#0033A0] mb-4">Visitor Details</h2>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
              {["name", "usn", "age", "purpose", "phone"].map((field) => (
                <div className="flex flex-col" key={field}>
                  <label htmlFor={field} className="text-sm text-[#6B7280] mb-1">
                    {field === "usn" ? "ID / Ref" : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    id={field}
                    type={field === "phone" ? "number" : "text"}
                    name={field}
                    value={student[field]}
                    onChange={handleChange}
                    placeholder={field === "purpose" ? "Purpose" : field.charAt(0).toUpperCase() + field.slice(1)}
                    className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  />
                </div>
              ))}

              {/* Controls */}
              <div className="sm:col-span-2 flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={captureAndSend}
                  className="px-4 py-2 rounded-md bg-[#CE1126] text-white hover:bg-[#b20f20] shadow-sm"
                >
                  Enroll Face
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-md border border-[#6B7280] text-[#6B7280]"
                >
                  Reset
                </button>
                <span className="text-xs text-[#6B7280]">Make sure the visitor faces the camera.</span>
              </div>
            </form>
          </article>

          {/* Right column - camera & quick info */}
          <aside className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-sm font-semibold text-[#0033A0]">Camera</h3>
              <div className="mt-3">
                <video ref={videoRef} autoPlay muted className="w-full rounded-md border border-gray-200" />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              <p className="text-xs text-[#6B7280] mt-3">Position the visitor about arm’s length from the camera and ensure even lighting.</p>
              <button
                onClick={captureAndSend}
                className="mt-3 w-full px-3 py-2 rounded-md bg-[#1E90FF] text-white hover:bg-[#187bdb]"
              >
                Capture & Enroll
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="text-sm font-semibold text-[#0033A0]">Quick Actions</h4>
              <div className="mt-3 flex flex-col gap-2">
                <Link to="/Enrolled" className="px-3 py-2 rounded-md border border-[#0033A0] text-[#0033A0] text-center">View Enrolled</Link>
                <Link to="/dashboard" className="px-3 py-2 rounded-md bg-[#FFF1C2] text-[#0033A0] text-center">Back to Dashboard</Link>
              </div>
            </div>

            <div className="hidden lg:block rounded-lg p-3 bg-gradient-to-br from-[#FFF1C2] to-[#D4AF37] text-center">
              <p className="text-sm font-semibold text-[#0033A0]">BJMP Region-II</p>
              <p className="text-xs text-[#6B7280]">Rehabilitation & Service</p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Addstudent;

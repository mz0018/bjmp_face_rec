import React, { useState, useMemo } from "react";

const ManualAttendanceForm = ({ handleManualAttendance }) => {
  const [form, setForm] = useState({
    name: "",
    usn: "",
    course: "",
    recognizedAt: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const defaultDateTimeLocal = useMemo(() => {
    const pad = (n) => String(n).padStart(2, "0");
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const min = pad(d.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }, []);

  React.useEffect(() => {
    setForm((f) => ({ ...f, recognizedAt: defaultDateTimeLocal }));
  }, [defaultDateTimeLocal]);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!form.usn.trim()) return "ID / Reference is required.";
    if (!form.course.trim()) return "Purpose is required.";
    if (!form.recognizedAt) return "Date & time is required.";
    return "";
  };

  const submit = async (e) => {
    e?.preventDefault();
    setError("");
    setSuccess("");

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    const payload = {
      name: form.name.trim(),
      usn: form.usn.trim(),
      course: form.course.trim(),
      recognizedAt: new Date(form.recognizedAt).toISOString(),
    };

    try {
      setLoading(true);
      // support both sync and async handlers
      await Promise.resolve(handleManualAttendance(payload));
      setSuccess("Attendance recorded.");
      // reset form except date (set to now)
      setForm({
        name: "",
        usn: "",
        course: "",
        recognizedAt: defaultDateTimeLocal,
      });
      // remove success text after a moment
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to mark attendance. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-[#0033A0] mb-2">Add Attendance Manually</h2>
      <p className="text-xs text-[#6B7280] mb-4">Use this form to add a visitor/attendee manually.</p>

      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col">
          <label htmlFor="manual_name" className="text-sm text-[#6B7280] mb-1">Name</label>
          <input
            id="manual_name"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Full name"
            className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="manual_usn" className="text-sm text-[#6B7280] mb-1">ID / Reference</label>
          <input
            id="manual_usn"
            name="usn"
            value={form.usn}
            onChange={onChange}
            placeholder="ID or reference"
            className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="manual_course" className="text-sm text-[#6B7280] mb-1">Purpose</label>
          <input
            id="manual_course"
            name="course"
            value={form.course}
            onChange={onChange}
            placeholder="Purpose"
            className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="recognizedAt" className="text-sm text-[#6B7280] mb-1">Date & time</label>
          <input
            id="recognizedAt"
            name="recognizedAt"
            type="datetime-local"
            value={form.recognizedAt}
            onChange={onChange}
            className="px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            required
          />
        </div>

        <div className="sm:col-span-2 flex items-center gap-3 mt-1">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white font-medium shadow-sm ${
              loading ? "bg-[#CE1126]/60 cursor-not-allowed" : "bg-[#CE1126] hover:bg-[#b20f20]"
            }`}
          >
            {loading ? "Saving..." : "Mark Attendance"}
          </button>

          <button
            type="button"
            onClick={() =>
              setForm({
                name: "",
                usn: "",
                course: "",
                recognizedAt: defaultDateTimeLocal,
              })
            }
            className="px-4 py-2 rounded-md border border-[#6B7280] text-[#6B7280]"
          >
            Reset
          </button>

          <div className="ml-auto text-sm">
            {error && <div role="alert" className="text-sm text-red-600">{error}</div>}
            {success && <div role="status" aria-live="polite" className="text-sm text-green-600">{success}</div>}
          </div>
        </div>
      </form>
    </section>
  );
};

export default ManualAttendanceForm;

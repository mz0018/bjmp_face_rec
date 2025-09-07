const mongoose = require("mongoose");

const attendanceLogSchema = new mongoose.Schema({
    usn: String,
    name: String,
    course: String,
    recognizedAt: { type: Date, default: Date.now }
});

const AttendanceLog = mongoose.model('AttendanceLog', attendanceLogSchema);

module.exports = AttendanceLog;
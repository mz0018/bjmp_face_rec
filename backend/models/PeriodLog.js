const mongoose = require("mongoose");

const periodwiseAttendanceLogSchema = new mongoose.Schema({
    usn: String,
    name: String,
    course: String,
    period: String,
    recognizedAt: { type: Date, default: Date.now }
});

const PeriodwiseAttendanceLog = mongoose.model('PeriodwiseAttendanceLog', periodwiseAttendanceLogSchema);

module.exports = PeriodwiseAttendanceLog;
const express = require("express");
const router = express.Router();

const AttendanceLog = require('../models/AttendanceLog');
const Visitors = require('../models/Visitors');

router.get('/', async (req, res) => {
  try {
    const logs = await AttendanceLog.find().sort({ recognizedAt: -1 });
    res.json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ message: "Failed to fetch attendance logs" });
  }
});

router.post('/', async (req, res) => {
  const { usn, name, course, recognizedAt } = req.body;

  if (!usn) {
    return res.status(400).json({ message: "USN is required" });
  }

  try {
    let student = await Visitors.findOne({ usn });

    // If no student found, but name & course provided => allow manual entry
    if (!student && (!name || !course)) {
      return res.status(404).json({ message: "Student not found, and insufficient manual data provided" });
    }

    // Determine the current date (or use recognizedAt if provided)
    const today = new Date().toISOString().split('T')[0];
    const recognizedDate = recognizedAt ? new Date(recognizedAt) : new Date();

    // Check for existing attendance on the same day
    const existingLog = await AttendanceLog.findOne({
      usn,
      recognizedAt: {
        $gte: new Date(today),
        $lt: new Date(new Date(today).setDate(new Date(today).getDate() + 1))
      }
    });

    if (existingLog) {
      return res.status(400).json({ message: "Attendance already recorded for today" });
    }

    // Use data from the DB or from manual fields
    const log = new AttendanceLog({
      usn,
      name: student ? student.name : name,
      course: student ? student.course : course,
      recognizedAt: recognizedDate
    });

    await log.save();

    res.status(200).json({ message: "Attendance logged successfully" });
  } catch (err) {
    console.error("Error logging attendance:", err);
    res.status(500).json({ message: "Failed to log attendance" });
  }
});

module.exports = router;

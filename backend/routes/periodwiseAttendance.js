const express = require("express");
const router = express.Router();

const Visitors = require('../models/Visitors');
const PeriodwiseAttendanceLog = require('../models/PeriodLog');

function getPeriodForCurrentTime(currentTime) {
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  if (hours === 9) return 'Java';
  if (hours === 10 && minutes >= 10) return 'Python';
  if (hours === 11 && minutes >= 20) return 'Networking';
  if (hours === 12 && minutes >= 30) return 'AI/ML';
  if (hours === 18 && minutes >= 30) return 'React'; // 6:30 PM - 7:30 PM

  return 'No Period';
}

router.post('/', async (req, res) => {
  const { usn, recognizedAt } = req.body;

  console.log("Incoming data:", req.body);

  if (!usn) {
    return res.status(400).json({ message: "USN is required" });
  }

  try {
    const student = await Visitors.findOne({ usn });

    if (!student) {
      console.log("Student not found");
      return res.status(404).json({ message: "Student not found" });
    }

    const now = recognizedAt ? new Date(recognizedAt) : new Date();
    const period = getPeriodForCurrentTime(now);

    console.log("Calculated period:", period); // 🔍

    if (period === 'No Period') {
      return res.status(400).json({ message: "No valid class period at this time" });
    }

    const today = new Date(now.toISOString().split('T')[0]);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const existingLog = await PeriodwiseAttendanceLog.findOne({
      usn,
      period,
      recognizedAt: { $gte: today, $lt: tomorrow }
    });

    if (existingLog) {
      return res.status(400).json({ message: `Attendance already recorded for ${period} today` });
    }

    const log = new PeriodwiseAttendanceLog({
      usn,
      name: student.name,
      course: student.course,
      period,
      recognizedAt: now
    });

    await log.save();
    console.log("Successfully saved period-wise attendance:", log); // 🔍

    res.status(200).json({ message: `Period-wise attendance recorded for ${period}`, log });

  } catch (err) {
    console.error("Error logging periodwise attendance:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/', async(req,res)=>{
try{
  const logs=await PeriodwiseAttendanceLog.find().sort({recognizedAt:-1});
res.json(logs);
}catch{
  console.log("Error fetching periodwise logs:", err);
  res.status(500).json({ message: "Failed to fetch periodwise attendance logs" });
}
});

module.exports = router;
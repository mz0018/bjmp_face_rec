const express = require("express");
const router = express.Router();

const Visitors = require('../models/Visitors')

router.post('/', async (req, res) => {
  const { name, usn, age, course, phone } = req.body;

  if (!name ||!usn || !age || !course || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newStudent = new Visitors({ name, usn, age, course, phone });
    await newStudent.save();
    res.status(200).json({ message: "Student saved to database!" });
  } catch (err) {
    console.error("Error saving student:", err);
    res.status(500).json({ message: "Failed to save student" });
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await Visitors.find().sort({ enrolledAt: -1 });
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

module.exports = router;
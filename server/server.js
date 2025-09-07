const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;
const allowed_origin = process.env.ORIGIN_URL || "http://localhost:5173";

connectDB();

app.use(cors({
  origin: allowed_origin,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "50mb" })); 
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

const adminRoutes = require('./routes/admin');
const visitorsRoutes = require('./routes/visitors');
const attendanceRoutes = require('./routes/attendanceLogs');
const periodwiseRoutes = require('./routes/periodwiseAttendance');
const recognizeRoutes = require('./routes/recognize');

app.use('/api/admin', adminRoutes);
app.use('/api/students', visitorsRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/periodwise-attendance', periodwiseRoutes);
app.use('/api/recognize', recognizeRoutes); //for testing use dummy account

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});











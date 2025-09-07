const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
    name: String,
    usn:String,
    age: String,
    course: String,
    phone: String,
    enrolledAt: { type: Date, default: Date.now }
});

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;
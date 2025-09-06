const mongoose = require("mongoose");

const mongoURI = 'mongodb+srv://bjmp_face_recog:LXKGvyAsIaAx32hT@bjmp.kexnzgt.mongodb.net/?retryWrites=true&w=majority&appName=bjmp';

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB")
    } catch (err) {
        console.error("Connection Error: ", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
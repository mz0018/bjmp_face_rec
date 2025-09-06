const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ message: "Image is required for recognition" });
    }

    console.log("📸 Received image, length:", image.length);
    const dummyUsn = "12345";

    console.log("✅ Match found:", dummyUsn);

    res.status(200).json({
      message: "Match found",
      usn: dummyUsn
    });
  } catch (err) {
    console.error("Recognition error:", err);
    res.status(500).json({ message: "Recognition failed" });
  }
});

module.exports = router;

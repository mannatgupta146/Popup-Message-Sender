const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Debugging logs to verify environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ EMAIL_USER or EMAIL_PASS not set! Check your .env file.");
  process.exit(1); // Exit if credentials are missing
}

console.log("📩 EMAIL_USER:", process.env.EMAIL_USER ? "Loaded ✅" : "Not Found ❌");
console.log("🔑 EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Not Found ❌");
console.log("🌍 FRONTEND_URL:", process.env.FRONTEND_URL || "Not Set");

// ✅ CORS settings
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use(bodyParser.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is working! 🚀");
});

// ✅ Email transporter setup
let transporter;
try {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
} catch (error) {
  console.error("❌ Failed to configure email transporter:", error);
  process.exit(1);
}

// ✅ Email sending endpoint
app.post("/send", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: "⚠️ Email and message are required." });
  }

  console.log(`📨 Sending email from: ${email}`);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "📩 New Message from Website User",
    text: `You have a new message from ${email}:\n\n${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    res.json({ message: "✔️ Message sent successfully!" });
  } catch (error) {
    console.error("🚨 Error sending email:", error);
    res.status(500).json({ message: "❌ Failed to send message. Try again later." });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

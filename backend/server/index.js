const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
const allowedOrigins = [
  "http://localhost:3000",
  "https://popup-message-sender-1.onrender.com" 
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Check for environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ EMAIL_USER or EMAIL_PASS not set! Check your .env file.");
  process.exit(1);
}

// Nodemailer transporter setup
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

// Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is working! 🚀");
});

// Email sending endpoint
app.post("/send", async (req, res) => {
  const { email, message } = req.body;
  console.log("📩 Received email request from:", email);

  if (!email || !message) {
    return res.status(400).json({ message: "⚠️ Email and message are required." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Receiver
    replyTo: email,
    subject: "📬 New Message from pop message sender",
    text: `You have received a new message from ${email}:\n\n${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    res.json({ message: "✅ Email sent successfully!" });
  } catch (error) {
    console.error("🚨 Error sending email:", error);
    res.status(500).json({ message: "❌ Failed to send message. Try again later." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

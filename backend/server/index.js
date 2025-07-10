const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const validator = require("validator");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

/* ────────────── CORS ────────────── */
const allowedOrigins = [
  "http://localhost:3000",
  "https://popup-message-sender-1.onrender.com"
];

app.use(cors({
  origin: (origin, cb) =>
    !origin || allowedOrigins.includes(origin)
      ? cb(null, true)
      : cb(new Error("Not allowed by CORS")),
  credentials: true
}));

/* ────────────── Body Parsing ────────────── */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ────────────── .env Check ────────────── */
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ Missing EMAIL_USER or EMAIL_PASS in .env");
  process.exit(1);
}

/* ────────────── Nodemailer ────────────── */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ────────────── Routes ────────────── */
app.get("/", (_, res) => {
  res.send("✅ Backend is working! 🚀");
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("📩 Incoming message from:", name, email);

  if (!name || !email || !message) {
    return res.status(400).json({ message: "⚠️ Name, email, and message are required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "⚠️ Please enter a valid email address." });
  }

  // ✅ Strictly allow only gmail.com and cuchd.in domains
  const domain = email.split("@")[1]?.toLowerCase();
  const allowedDomains = ["gmail.com", "cuchd.in"];
  const isAllowedDomain = allowedDomains.includes(domain);

  if (!isAllowedDomain) {
    return res.status(400).json({ message: "⚠️ Only Gmail or cuchd.in emails are allowed." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `📬 New Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`
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

/* ────────────── Start Server ────────────── */
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

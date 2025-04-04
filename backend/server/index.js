const express = require("express")
const cors = require("cors")
// const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors({ origin: "http://localhost:3000", credentials: true }))
app.use(express.json())
app.use(express.static("public")) // Serve static filepublic directors from the y
app.use(express.urlencoded({ extended: true }))

// ✅ Debugging logs to verify environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("❌ EMAIL_USER or EMAIL_PASS not set! Check your .env file.")
  process.exit(1) // Exit if credentials are missing
}

// console.log("📩 EMAIL_USER:", process.env.EMAIL_USER ? "Loaded ✅" : "Not Found ❌");
// console.log("🔑 EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded ✅" : "Not Found ❌");
// console.log("🌍 FRONTEND_URL:", process.env.FRONTEND_URL || "Not Set");
app.get("/", (req, res) => {
  res.send("✅ Backend is working! 🚀")
})
let transporter
try {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
} catch (error) {
  console.error("❌ Failed to configure email transporter:", error)
  process.exit(1)
}

// ✅ Email sending endpoint
app.post("/send", async (req, res) => {
  const { email, message } = req.body
  console.log("📩 Received email request:", email)
  if (!email || !message) {
    return res
      .status(400)
      .json({ message: "⚠️ Email and message are required." })
  }

  // console.log(`📨 Sending email from: ${email}`)

  // const mailOptions = {
  //   from: process.env.EMAIL_USER,
  //   to: process.env.EMAIL_USER,
  //   replyTo: email,
  //   subject: "📩 New Message from Website User",
  //   text: `You have a new message from ${email}:\n\n${message}`,
  // }

  try {
    // const info = await transporter.sendMail(mailOptions)
    // console.log("✅ Email sent:", info.response)
    res.json({ message: email })
  } catch (error) {
    console.error("🚨 Error sending email:", error)
    res
      .status(500)
      .json({ message: "❌ Failed to send message. Try again later." })
  }
})

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})

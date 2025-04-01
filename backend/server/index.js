const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const nodemailer = require("nodemailer")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 4000

// Add this route to handle GET requests to the root
app.get("/", (req, res) => {
  res.send("Backend is working! 🚀");
});

app.use(cors({ 
  origin: process.env.FRONTEND_URL || "http://localhost:3000" 
}));

app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

app.post("/send", (req, res) => {
  const { email, message } = req.body

  if (!email || !message) {
    return res.status(400).json({ message: "Email and message are required." })
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "New Message from Website User",
    text: `You have a new message from ${email}:\n\n${message}`,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error)
      return res.status(500).json({ message: "Failed to send message." })
    }
    res.json({ message: "Message sent successfully!" })
  })
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})

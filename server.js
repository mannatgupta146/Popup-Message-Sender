const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();  // Load environment variables from .env file

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Nodemailer configuration using environment variables
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,  // Your email for sending
        pass: process.env.EMAIL_PASS,  // App password or regular email password
    },
});

app.post("/send", (req, res) => {
    const { email, message } = req.body;

    // Validation: Ensure both email and message are provided
    if (!email || !message) {
        return res.status(400).json({ message: "Email and message are required." });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,  // Your email for authentication
        to: process.env.EMAIL_USER,    // The recipient (you)
        replyTo: email,                // User's email for replies
        subject: "New Message from Website User",
        text: `You have a new message from ${email}:\n\n${message}`,  // Message body
    };
    

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: "Failed to send message." });
        }
        res.json({ message: "Message sent successfully!" });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

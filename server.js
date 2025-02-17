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
        user: process.env.EMAIL_USER,  // Get email from .env
        pass: process.env.EMAIL_PASS,  // Get password from .env
    },
});

app.post("/send", (req, res) => {
    const { email, message } = req.body;

    if (!email || !message) {
        return res.status(400).json({ message: "Email and message are required." });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,  // Use email from .env
        to: email,  // Send the message to the email provided by the user
        subject: "New Message from Message Popup",
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: "Failed to send message." });
        }
        res.json({ message: "Message sent successfully!" });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

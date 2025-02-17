const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mannatgupta146@gmail.com",  // Replace with your email
        pass: "hello@146",   // Replace with your email password or app password
    },
});

app.post("/send", (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: "Message is required." });
    }

    const mailOptions = {
        from: "mannatgupta146@gmail.com",
        to: "recipient-email@gmail.com",  // Replace with the email you want to receive messages at
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

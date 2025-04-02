import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  const toggleMessageForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !message.trim()) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    try {
      const API_URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:4000/send"
          : "https://popup-message-sender.vercel.app/send";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      // Log raw response before parsing JSON
      const text = await response.text();
      console.log("📩 Raw server response:", text);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (!text) {
        throw new Error("Empty response from server.");
      }

      const data = JSON.parse(text);
      alert(data.message || "✓ Message sent successfully!");
      setEmail("");
      setMessage("");
      toggleMessageForm();
    } catch (error) {
      alert("⚠️ Error sending message. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <button className="button" onClick={toggleMessageForm}>
        Send a Message
      </button>

      <div
        className={`messageForm ${showForm ? "active" : ""} ${
          isShaking ? "error-shake" : ""
        }`}
      >
        <div className="form-content">
          <h2>Send a Message</h2>

          <form onSubmit={handleSubmit}>
            <div className="box">
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="box">
              <textarea
                placeholder="Enter Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="box">
              <button type="submit">Send</button>
            </div>
          </form>

          <button className="close" onClick={toggleMessageForm}>
            <FaTimes className="fa-times" />
          </button>
        </div>
      </div>

      {showForm && <div className="backdrop" onClick={toggleMessageForm} />}
    </div>
  );
}

export default App;
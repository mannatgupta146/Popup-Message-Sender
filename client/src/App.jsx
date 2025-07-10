import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleMessageForm = () => {
  if (showForm) {
    // When closing, first set to inactive state
    setShowForm(false);
    // Then clear error message after a delay
    setTimeout(() => setErrorMessage(""), 300);
  } else {
    // When opening, show immediately
    setShowForm(true);
    setErrorMessage("");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setIsShaking(true);
      setErrorMessage("⚠️ Please fill out all fields.");
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    const domain = email.split("@")[1]?.toLowerCase();
    if (!["gmail.com", "cuchd.in"].includes(domain)) {
      setIsShaking(true);
      setErrorMessage("⚠️ Only Gmail or cuchd.in emails are allowed.");
      setTimeout(() => setIsShaking(false), 400);
      return;
    }

    try {
      setLoading(true);
      const API_URL = "https://popup-message-sender.onrender.com/send";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const text = await response.json();

      if (!response.ok) {
        throw new Error(text.message || "Something went wrong.");
      }

      alert(text.message || "✓ Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      toggleMessageForm();
    } catch (error) {
      setErrorMessage("⚠️ Error sending message. Please try again.");
      console.error("🚨 Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <button className="button" onClick={toggleMessageForm}>
        Send a Message
      </button>

      <div className={`messageForm ${showForm ? "active" : "inactive"} ${isShaking ? "error-shake" : ""}`}>
        <div className="form-content">
          <h2>Send a Message</h2>

          <form onSubmit={handleSubmit}>
            <div className="box">
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="box">
              <input
                type="email"
                placeholder="Enter Your Gmail"
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

            {errorMessage && (
              <div className="box" style={{ color: "#b30000", fontWeight: 500 }}>
                {errorMessage}
              </div>
            )}

            <div className="box">
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>

          <button className="close" onClick={toggleMessageForm}>
            <FaTimes className="fa-times" />
          </button>
        </div>
      </div>

      <div className={`backdrop ${showForm ? "active" : "inactive"}`} onClick={toggleMessageForm} />
    </div>
  );
}

export default App;

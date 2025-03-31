import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
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
       const response = await fetch("popup-message-sender.vercel.app/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();
      alert(data.message || "✓ Message sent successfully!");
      setEmail('');
      setMessage('');
      toggleMessageForm();
    } catch (error) {
      alert("⚠️ Error sending message. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      {/* Main Button */}
      <button 
        className="button" 
        onClick={toggleMessageForm}
      >
        Send a Message
      </button>

      {/* Popup Form */}
      <div className={`messageForm ${showForm ? 'active' : ''} ${isShaking ? 'error-shake' : ''}`}>
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
          
          <button 
            className="close" 
            onClick={toggleMessageForm}
          >
            <FaTimes className="fa-times" />
          </button>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {showForm && <div className="backdrop" onClick={toggleMessageForm} />}
    </div>
  );
}
// Add this ABOVE your existing POST route
// app.get("/", (req, res) => {
//   res.send("Backend is running!");
// });

export default App;

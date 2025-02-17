function toggleMessageForm() {
    const messageForm = document.getElementById("messageForm");
    messageForm.classList.toggle("active");
}

function sendMessage() {
    const userEmail = document.getElementById("userEmail").value;
    const userMessage = document.getElementById("userMessage").value;

    if (!userEmail || !userMessage) {
        alert("Both email and message are required.");
        return;
    }

    const messageData = {
        email: userEmail,
        message: userMessage,
    };

    fetch("http://localhost:3000/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || "Message sent successfully!");
        toggleMessageForm();  // Close the form after sending the message
    })
    .catch(error => {
        alert("Error sending message.");
        console.error(error);
    });
}

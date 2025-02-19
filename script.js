function toggleMessageForm() {
    const messageForm = document.getElementById("messageForm");
    messageForm.classList.toggle("active");
}

function sendMessage() {
    const form = document.getElementById("messageForm");
    const userEmail = document.getElementById("userEmail");
    const userMessage = document.getElementById("userMessage");

    if (!userEmail.value || !userMessage.value) {
        form.classList.add('error-shake');
        setTimeout(() => form.classList.remove('error-shake'), 400);
        alert("Please fill in both email and message fields.");
        return;
    }

    const messageData = {
        email: userEmail.value,
        message: userMessage.value,
    };

    fetch("http://localhost:3000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || "✓ Message sent successfully!");
        userEmail.value = "";
        userMessage.value = "";
        toggleMessageForm();
    })
    .catch(error => {
        alert("⚠️ Error sending message. Please try again.");
        console.error("Error:", error);
    });
}
function toggleMessagePopup() {
    const messagePopup = document.getElementById("messagePopup");
    messagePopup.classList.toggle("active");
}

function sendMessage() {
    const message = document.getElementById("messageInput").value.trim();
    if (!message) {
        alert("Please enter a message.");
        return;
    }

    // Send message to the backend
    fetch("http://localhost:3000/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        toggleMessagePopup(); // Close the popup after sending
    })
    .catch(error => {
        alert("Error sending message: " + error.message);
    });
}

# 📬 Popup Message Sender

A sleek, full-stack messaging application that lets users send emails through a pop-up form interface. Built with **React.js**, **Node.js**, **Express**, and **Nodemailer**, this project demonstrates client-server interaction, form handling, and email services — all with smooth deployment on **Render**.


## 🚀 Live Demo

🔗 **Frontend:** [https://popup-message-client.onrender.com](https://popup-message-sender-1.onrender.com/)  
🔗 **Backend API:** [https://popup-message-sender.onrender.com](https://popup-message-sender.onrender.com/)


## ✨ Features

- 📬 Pop-up form for message submission
- 📧 Email delivery via Nodemailer (Gmail)
- ✅ Input validation & visual feedback
- 🔒 Environment-secured credentials
- 🌐 Deployed with Render for easy access


## 🛠️ Tech Stack

- **Frontend:** React.js, CSS
- **Backend:** Node.js, Express.js
- **Email Service:** Nodemailer (Gmail)
- **Deployment:** Render (for both frontend & backend)


## ⚙️ How It Works

1. User clicks the **"Send a Message"** button.
2. A form pops up allowing input of email & message.
3. On submit:
   - Frontend sends a `POST` request to `/send` API.
   - Backend uses **Nodemailer** to send the message to your configured email.
4. User gets a success or error alert.


## 🔐 Environment Variables

Create a `.env` file in the `backend/` folder:

```EMAIL_USER=your_email@gmail.com and EMAIL_PASS=your_app_password```

> 💡 If using Gmail, enable **App Passwords** from your Google account settings.


## 🌍 Deployment

* **Frontend:** Deployed as a static site on Render from `/client`
* **Backend:** Deployed as a web service on Render from `/backend`

Make sure CORS is configured to allow your frontend domain in backend.


## 🧰 Installation

### 1. Clone the repository

```bash
git clone https://github.com/mannatgupta146/Popup-Message-Sender.git
cd Popup-Message-Sender
```

### 2. Setup backend

```bash
cd backend
npm install
npm start
```

### 3. Setup frontend

```bash
cd ../client
npm install
npm start
```

Visit `http://localhost:3000` to test locally.


## 🤝 Contribution

Contributions are welcome! Here’s how you can help:

- 💡 Suggest new features or UI improvements  
- 🐛 Report bugs or issues  
- 🔧 Fix code and submit pull requests  

To contribute:

1. Fork this repository  
2. Create a new branch (`git checkout -b feature-name`)  
3. Make your changes  
4. Commit and push (`git commit -m "Add feature"`)  
5. Open a pull request 🎉  

## 🙏 Credits

- Special thanks to my friend **Abhay Bansal** for his help and support during the development of this project.  
  🔗 [GitHub – Targter](https://github.com/Targter)

---

> 👋 *When the popup appears... it should feel like "Hey, it's me!"*
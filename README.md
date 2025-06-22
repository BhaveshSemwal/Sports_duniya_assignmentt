# 📰 React Firebase Auth & News Dashboard

This is a full-stack web application built with **React** and **Firebase** that allows users to **sign up or log in** as either a regular user or an admin. It also fetches and displays live news using the [News API](https://newsapi.org/).

---

## 🔐 Features

- 🔑 Sign up and login as **User** or **Admin**
- 📧 Authentication using **Email & Password**
- 🔵 OAuth Login using **Google**
- 📰 Live News fetched from **News API**
- 🔁 Persistent sessions (remains logged in on refresh)
- 🎨 Clean and responsive UI built with Tailwind CSS

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS
- **Authentication**: Firebase Authentication
- **Database**: Firebase Realtime Database or Firestore
- **News Feed**: News API

---

## ⚙️ Getting Started

### 📦 Install Dependencies

```bash
npm install
```
🔥 Configure Firebase
Create a Firebase project at https://console.firebase.google.com

Enable the following under Authentication:

Email/Password

Google Sign-In

Replace the Firebase config in your firebase.js file with your project credentials:

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

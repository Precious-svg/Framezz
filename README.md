# 📱 Framez – Mobile Social App (React Native + Firebase)

**Framez** is a mobile social application built with **React Native (Expo)** that allows users to share posts, view a feed, and manage their profile.  
The app is integrated with **Firebase Authentication**, **Cloud Firestore**, and **Firebase Storage** to handle user data, posts, and media files.

---

## 🚀 Features

### 🔐 Authentication
- Secure **Sign Up**, **Login**, and **Logout** using **Firebase Authentication**.
- Persistent sessions – users remain logged in after reopening the app.

### 📝 Posts
- Users can create posts with **text** and/or **images**.
- View a **feed** showing posts from all users (chronological or latest-first).
- Each post includes:
  - Author’s name  
  - Timestamp  
  - Text and/or Image  

### 👤 Profile
- Displays the **current user’s details** (name, email, and avatar if available).
- Shows **all posts** created by the current user.

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| Framework | **React Native (Expo)** |
| Backend | **Firebase** |
| Database | **Cloud Firestore** |
| Storage | **Firebase Storage** |
| Auth | **Firebase Authentication** |
| State Management | Context API / Zustand / Redux (optional) |
| Deployment | Expo Go (testing) + [Appetize.io](https://appetize.io) (demo hosting) |

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/framez.git
cd framez
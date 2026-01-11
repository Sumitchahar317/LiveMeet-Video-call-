# LiveMeet - Video Calling Application 📹✨

LiveMeet is a real-time video conferencing application built with **React**, **Node.js**, **Socket.io**, and **WebRTC**. It allows users to join rooms and make peer-to-peer video calls with low latency.

## 🚀 Features

-   **Real-time Video & Audio**: Crystal clear peer-to-peer communication using WebRTC.
-   **Room System**: Join specific rooms to talk privately.
-   **Instant Signaling**: Fast connection setup using Socket.io.
-   **Responsive Design**: Glassmorphism UI that looks great on all screens.
-   **End Call Functionality**: Cleanly disconnect and return to the home screen.

## 🛠️ Tech Stack

-   **Frontend**: React.js, React Router, Bootstrap (Glassmorphism UI)
-   **Backend**: Node.js, Express
-   **Real-time Communication**: Socket.io (Signaling), WebRTC (Media Streams)

## 📂 Project Structure

```bash
LiveMeet/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (HomeView, JoinView, RoomView)
│   │   ├── context/        # Global Socket Provider
│   │   ├── pages/          # Page Logic (Home, Join, Room)
│   │   └── service/        # WebRTC Peer Service
│   └── public/
├── server/                 # Node.js Signaling Server
│   └── index.js            # Socket.io Logic
```

## ⚡️ Getting Started

Follow these steps to run the project locally.

### Pre-requisites
- Node.js installed (v14+ recommended)

### 1. Start the Server (Signaling)
The backend runs on port `8000` (HTTP) and `8001` (Socket).

```bash
cd server
npm install
npm install -g nodemon  # Optional, for hot reloading
nodemon index.js
```

### 2. Start the Client (Frontend)
The frontend runs on port `3000`.

```bash
cd client
npm install
npm start
```

### 3. Usage
1. Open `http://localhost:3000` in your browser.
2. Click **Join Meeting**.
3. Enter your **Email** and a **Room ID** (e.g., `123`).
4. Open a **New Tab** and join the **SAME Room ID** (`123`).
5. Click **"CALL"** in one tab.
6. The other tab will auto-answer.
7. Click **"Send Stream"** on both tabs to see video!

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open-source and available under the MIT License.

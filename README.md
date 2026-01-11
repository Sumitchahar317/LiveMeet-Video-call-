# LiveMeet - Video Conferencing App 📹✨

LiveMeet is a modern, real-time video calling application built with the **MERN** stack (minus Mongo unless you add it later) + **WebRTC** and **Socket.io**. It features a clean glassmorphism UI and instant peer-to-peer connection.

## � Live Demo
-   **Frontend (App)**: [https://livemeet-client-bbe4ch108-sumitchahar317s-projects.vercel.app](https://livemeet-client-bbe4ch108-sumitchahar317s-projects.vercel.app)
-   **Backend (API)**: [https://livemeet-w3if.onrender.com](https://livemeet-w3if.onrender.com)

## �🚀 Features

-   **Video & Audio**: High-quality real-time communication.
-   **No Login Required**: Just enter an email and room ID to join.
-   **Peer-to-Peer**: Direct browser connection using WebRTC (Mesh topology).
-   **Responsive UI**: Built with React & Bootstrap, looks great on mobile & desktop.
-   **Signaling Server**: Efficient Node.js backend for connection handshakes.

---

## 🛠️ Tech Stack

-   **Frontend**: React.js, React Router v6, Bootstrap 5.
-   **Backend**: Node.js, Express.js.
-   **Real-time**: Socket.io (Signaling), WebRTC (Media Streams).
-   **Deployment**: Ready for Vercel (Client) + Render (Server).

---

## 📂 Project Structure

```bash
LiveMeet/
├── client/                 # React Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── context/        # Socket.io Context Provider
│   │   ├── pages/          # Main Pages (Home, Join, Room)
│   │   └── service/        # PeerService (WebRTC Logic)
├── server/                 # Node.js Signaling Server
│   └── index.js            # Entry Point
```

---

## ⚡️ Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/Sumitchahar317/LiveMeet-Video-call-.git
cd "LiveMeet-Video-call-"
```

### 2. Setup Server (Backend)
Run the signaling server on port `8000`.
```bash
cd server
npm install
npm install -g nodemon # Optional
nodemon index.js
```

### 3. Setup Client (Frontend)
Run the React app on port `3000`.
```bash
cd client
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

## 🌍 Deployment Guide

### Backend (Render.com)
1.  Check the `server` folder into GitHub.
2.  Create a **New Web Service** on Render.
3.  Connect your repo and set **Root Directory** to `server`.
4.  Build Command: `npm install`
5.  Start Command: `node index.js`
6.  Render will provide a URL (e.g., `https://your-server.onrender.com`).

### Frontend (Vercel)
1.  Check the `client` folder into GitHub.
2.  Import the project into Vercel.
3.  Set **Root Directory** to `client`.
4.  **Environment Variables**:
    *   `REACT_APP_BACKEND_URL`: Set this to your Render Backend URL (e.g., `https://your-server.onrender.com`).
5.  Deploy!

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1.  Fork the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
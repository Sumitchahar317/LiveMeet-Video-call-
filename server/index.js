/**
 * Signaling Server for LiveMeet
 * This server handles the initial connection and signaling between peers (WebRTC). 
 */
const express = require('express');
const { Server } = require('socket.io');
const http = require('http'); 

const app = express();
const server = http.createServer(app); 
const io = new Server(server, { 
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(express.json()); // middleware used to parse data from client to server (req.body)

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on('connection', (socket) => {
    /*
     * Triggered when a user tries to join a specific room.
     * We map their email to their socket ID and notify others in the room.
     */
    socket.on("room:join", (data) => {
        const { email, room } = data;

        // Save the user in our maps for quick lookup
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);

        // Notify others in the room:
        io.to(room).emit("user:joined", { email, id: socket.id });

        // Actually put this socket in the "socket.io room" 
        socket.join(room);

        // Notify user that they have successfully joined
        io.to(socket.id).emit("room:join", data);
    });

    /**
     * Triggered when User A wants to call User B.
     * Forwards the WebRTC "Offer" from A to B.
     */
    socket.on("user:call", ({ to, offer }) => {
        io.to(to).emit("incoming:call", { from: socket.id, offer });
    });

    /**
     * Triggered when User B accepts User A's call.
     * Forwards the WebRTC "Answer" from B back to A.
     */
    socket.on("call:accepted", ({ to, ans }) => {
        io.to(to).emit("call:accepted", { from: socket.id, ans });
    });

    /**
     * Triggered when negotiation is needed (e.g., adding a new track/screen share).
     * Forwards the new "Offer" to the peer.
     */
    socket.on("peer:nego:needed", ({ to, offer }) => {
        io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
    });

    /**
     * Triggered when the negotiation update is accepted.
     * Forwards the new "Answer" back to the first peer.
     */
    socket.on("peer:nego:done", ({ to, ans }) => {
        io.to(to).emit("peer:nego:final", { from: socket.id, ans });
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
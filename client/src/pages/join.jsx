import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import JoinView from "../components/JoinView";

/**
 * JoinPage Component
 * 
 * Handles the logic for joining a specific room.
 * 1. Collects Email and Room ID from the user.
 * 2. Emits a socket event to the server to join the room.
 * 3. Listens for a success confirmation from the server to navigate to the Room page.
 */
const Joinpage = () => {
    const [email, setEmail] = useState("");
    const [room, setRoom] = useState("");

    const socket = useSocket();
    const navigate = useNavigate();

    /**
     * handleSubmitForm
     * Triggered when the user submits the join form.
     * Emits 'room:join' event to the server.
     */
    const handleSubmitForm = useCallback(
        (e) => {
            e.preventDefault();
            socket.emit("room:join", { email, room });
        },
        [email, room, socket]
    );

    /**
     * handleJoinRoom
     * Triggered when the server confirms the room join.
     * Navigates the user to the actual Room page with the Room ID in the URL.
     */
    const handleJoinRoom = useCallback(
        (data) => {
            const { room } = data;
            navigate(`/room/${room}`);
        },
        [navigate]
    );

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);
        return () => {
            socket.off("room:join", handleJoinRoom);
        };
    }, [socket, handleJoinRoom]);

    return (
        <JoinView
            email={email}
            setEmail={setEmail}
            room={room}
            setRoom={setRoom}
            onSubmit={handleSubmitForm}
        />
    );
};

export default Joinpage;
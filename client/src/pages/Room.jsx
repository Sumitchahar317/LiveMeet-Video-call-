import React, { useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import RoomView from "../components/RoomView";

import peer from "../service/peer";

/**
 * RoomPage Component
 * 
 * This contains the CORE LOGIC for the video call.
 * It manages:
 * 1. WebRTC Peer Connection (via PeerService).
 * 2. Socket.io Signaling (Exchanging offers/answers).
 * 3. Media Streams (Camera/Microphone).
 * 4. UI State (Connected status, stream availability).
 */
const RoomPage = () => {
    const socket = useSocket();
    const navigate = useNavigate();
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();

    /**
     * Event: user:joined
     * When a new user joins the room, we store their socket ID so we know who to call.
     */
    const handleUserJoined = useCallback(({ email, id }) => {
        console.log(`Email ${email} joined room`);
        setRemoteSocketId(id);
    }, []);

    /**
     * Action: CALL
     * Initiates the call to the remote user.
     * 1. Get local media stream (Video/Audio).
     * 2. Create a WebRTC Offer.
     * 3. Send the Offer via Socket to the remote user.
     */
    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peer.getOffer();
        socket.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    /**
     * Event: incoming:call
     * Handles an incoming call offer from a remote user.
     * 1. Store the caller's Socket ID.
     * 2. Get local media stream.
     * 3. Generate a WebRTC Answer.
     * 4. Send the Answer back via Socket.
     */
    const handleIncomingCall = useCallback(
        async ({ from, offer }) => {
            setRemoteSocketId(from);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setMyStream(stream);
            console.log(`Incoming Call`, from, offer);
            const ans = await peer.getAnswer(offer);
            socket.emit("call:accepted", { to: from, ans });
        },
        [socket]
    );

    const [remoteStream, setRemoteStream] = useState();

    
     //  Action: END CALL
    const handleEndCall = useCallback(() => {
        // Stop all local tracks (turn off camera/mic)
        if (myStream) {
            myStream.getTracks().forEach(track => track.stop());
            setMyStream(null);
        }

        // Clean up connection
        peer.peer.close();

        // Go back home
        navigate('/');
        // Force reload to clear any peer state completely
        window.location.reload();
    }, [myStream, navigate]);

    /**
     * Event: negotiationneeded
     * Triggered by WebRTC internally when connection needs update (e.g. adding a new track).
     * We create a new Offer and send it to the other peer.
     */
    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    /**
     * Pushes the local media tracks into the Peer Connection so the other side can see us.
     */
    const sendStreams = useCallback(() => {
        if (!myStream) return;
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    /**
     * Event: call:accepted
     * When the remote user accepts our call (sends an Answer):
     * 1. We set the Local Description with their Answer.
     * 2. The connection is established!
     * 3. We assume it's safe to send our video stream now.
     */
    const handleCallAccepted = useCallback(
        ({ from, ans }) => {
            peer.setLocalDescription(ans);
            console.log("Call Accepted!");
            sendStreams();
        },
        [sendStreams]
    );

    // Setup negotiation listeners
    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);

    /**
     * When the other side wants to renegotiate:
     * 1. Create an Answer for their new Offer.
     * 2. Send it back with 'peer:nego:done'.
     */
    const handleNegoNeedIncoming = useCallback(
        async ({ from, offer }) => {
            const ans = await peer.getAnswer(offer);
            socket.emit("peer:nego:done", { to: from, ans });
        },
        [socket]
    );

    /**
     * Event: peer:nego:final
     * The final step of renegotiation where we set the final Local Description.
     */
    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    // Listen for remote tracks (video/audio from the other person)
    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    // Global Socket Event Listeners
    useEffect(() => {
        socket.on("user:joined", handleUserJoined);
        socket.on("incoming:call", handleIncomingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeedIncoming);
        socket.on("peer:nego:final", handleNegoNeedFinal);

        return () => {
            socket.off("user:joined", handleUserJoined);
            socket.off("incoming:call", handleIncomingCall);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:nego:needed", handleNegoNeedIncoming);
            socket.off("peer:nego:final", handleNegoNeedFinal);
        };
    }, [
        socket,
        handleUserJoined,
        handleIncomingCall,
        handleCallAccepted,
        handleNegoNeedIncoming,
        handleNegoNeedFinal,
    ]);


    return (
        <RoomView
            remoteSocketId={remoteSocketId}
            myStream={myStream}
            remoteStream={remoteStream}
            onSendStream={sendStreams}
            onCallUser={handleCallUser}
            onEndCall={handleEndCall}
        />
    );
};

export default RoomPage;

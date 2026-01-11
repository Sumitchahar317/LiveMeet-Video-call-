import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

/**
 * Socket Context
 * This context provides a single Socket.io instance to the entire application.
 */
const SocketContext = createContext(null);

/**
 * Custom Hook: useSocket
 * Allows any component to easily access the socket instance.
 * Usage: const socket = useSocket();
 */
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

/**
 * SocketProvider Component
 * Wraps the app and initializes the socket connection.
 */
export const SocketProvider = (props) => {
  // useMemo ensures the socket is created only once on mount
  const socket = useMemo(() => {
    const host = process.env.REACT_APP_BACKEND_URL || "localhost:8000";
    return io(host);
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
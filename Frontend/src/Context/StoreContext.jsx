import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:3000" || "https://plate-forward-one.vercel.app";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      
      // Decode token to get user info
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.id);
        setUserRole(payload.role);
        
        // Initialize Socket
        const socketConnection = io(url); 
        setSocket(socketConnection);

        socketConnection.on("connect", () => {
            console.log("Socket connected:", socketConnection.id);
            socketConnection.emit("join_room", payload.id);
        });

        return () => {
            socketConnection.disconnect();
        }

      } catch (error) {
        console.error("Error decoding token or connecting socket:", error);
      }

    } else {
        if(socket) {
            socket.disconnect();
            setSocket(null);
        }
        setUserId(null);
        setUserRole(null);
    }
  }, [token, url]);

  
  const contextValue = {
    url,
    token,
    setToken,
    socket,
    userId,
    userRole
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

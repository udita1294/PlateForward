import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL || "https://plateforward.onrender.com", {
  transports: ['websocket']
});
export default socket ;

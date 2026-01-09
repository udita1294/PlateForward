import { io } from "socket.io-client";

const socket = io("http://localhost:3000" || "https://plateforward.onrender.com", {
  transports: ['websocket']
});
export default socket ;

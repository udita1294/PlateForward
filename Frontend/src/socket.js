import { io } from "socket.io-client";

const socket = io( "https://plateforward.onrender.com" || "http://localhost:3000"
, {
  transports: ['websocket']
});
export default socket ;

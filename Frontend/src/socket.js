import { io } from "socket.io-client";

const socket = io("http://localhost:3000" || "https://plate-forward-one.vercel.app", {
  transports: ['websocket']
});
export default socket ;

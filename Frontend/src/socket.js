import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL || "https://plate-forward-one.vercel.app", {
  transports: ['websocket']
});
export default socket ;

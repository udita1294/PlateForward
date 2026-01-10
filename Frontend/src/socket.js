import { io } from "socket.io-client";

const socket = io( "https://plateforward.onrender.com"
, {
  transports: ['websocket']
});
export default socket ;

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./Routes/UserRoute.js";
import donationRoutes from "./Routes/donationRoutes.js";
import ngoRoutes from "./Routes/ngoRoutes.js";

import adminRoutes from "./Routes/adminRoutes.js";

import { createServer } from "http"; // Import createServer
import { Server } from "socket.io"; // Import Server from socket.io

const app = express();
const httpServer = createServer(app); // Create HTTP server

// Initialize Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins (update for production)
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.set("io", io); // Make io accessible in controllers

app.use(express.json());

app.use(cors());

// Socket.io connection handler (optional, for debugging)
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
  
  // Join a room based on user ID (if authenticated) to send private notifications
  socket.on("join_room", (userId) => {
    if(userId) {
        socket.join(userId);
        console.log(`User ${userId} joined room`);
    }
  });
});

await connectDB();

app.use("/api/user", userRoutes);
app.use("/api/donation", donationRoutes);
app.use("/api/ngo", ngoRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
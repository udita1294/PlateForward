import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./Routes/UserRoute.js";
import donationRoutes from "./Routes/donationRoutes.js";

const app = express();

app.use(express.json());

app.use(cors());
await connectDB();

app.use("/api/user", userRoutes);
app.use("/api/donation", donationRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

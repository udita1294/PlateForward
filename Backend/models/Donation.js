import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String },
  quantity: { type: String }, // e.g., "10 meals", "2 boxes"
  pickupLocation: { type: String, required: true },
  pickupDateTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ["available", "claimed", "picked_up", "cancelled"],
    default: "available"
  },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // receiver
}, { timestamps: true });

export default mongoose.model("Donation", donationSchema);

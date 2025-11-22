import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    location: { type: String, required: true },
    neededBy: { type: Date },
    fulfilled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Request", requestSchema);

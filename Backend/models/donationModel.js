import mongoose from "mongoose";

const pickupStatusHistorySchema = new mongoose.Schema(
  {
    status: { type: String, required: true },
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { _id: false }
);

const donationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: { type: String, required: true },
    description: { type: String, required: true },

    foodType: {
      type: String,
      enum: ["cooked", "raw", "packaged"],
      required: true,
    },
    quantity: { type: Number, required: true },

    pickupAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pin: { type: String, required: true },
    },
    pickupDateTime: { type: Date, required: true },

    status: {
      type: String,
      enum: ["active", "accepted", "assigned", "collected", "cancelled"],
      default: "active",
    },

    //NGO that accepted this donation
    acceptedByNgo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    //Volunteer assigned for pickup
    volunteerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // for tracking pickup status over time
    pickupStatusHistory: {
      type: [pickupStatusHistorySchema],
      default: [],
    },

    imgUrl: { type: String },
    cloudinaryId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Donation", donationSchema);

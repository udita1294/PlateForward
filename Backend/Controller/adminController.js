import User from "../models/User.js";
import Donation from "../models/donationModel.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonations = await Donation.countDocuments();
    
    // Donation breakdown by status
    const pendingDonations = await Donation.countDocuments({ status: "pending" });
    const completedDonations = await Donation.countDocuments({ status: "delivered" });

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalDonations,
        pendingDonations,
        completedDonations,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donorId", "name email")
      .populate("acceptedByNgo", "name")
      .populate("volunteerId", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, donations });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }
    await donation.deleteOne();
    res.status(200).json({ success: true, message: "Donation removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

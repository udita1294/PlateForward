import Donation from "../models/donationModel.js";

export const createDonation = async (req, res) => {
  try {
    const { title, description, foodType, quantity, pickupDateTime } = req.body;

    const pickupAddress = JSON.parse(req.body.pickupAddress);

    const newDonation = await Donation.create({
      donorId: req.user.id,
      title,
      description,
      foodType,
      quantity: Number(quantity),
      pickupAddress,
      pickupDateTime: new Date(pickupDateTime),
      imageUrl: req.file?.path || null,
    });

    res.status(201).json({ success: true, donation: newDonation });
  } catch (err) {
    console.error("Donation creation error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, donations });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

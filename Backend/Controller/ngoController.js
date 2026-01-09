import Donation from "../models/donationModel.js";

// Get all active donations for NGOs to view and accept
export const getAllActiveDonations =  async(req,res)=>{
    try{
        const donations =  await Donation.find({status:"pending"}).sort({createdAt : -1});
        res.json({success:true,donations});
    }catch(err){
        res.status(500).json({success:false , message : "Server Error"});
    }
};

// NGO accepts a donation 
export const acceptDonation = async(req,res)=>{
    try{
        const donationId = req.params.id;
        const { volunteerId } = req.body;

        const donation = await Donation.findById(donationId);
        if(!donation){
            return res.status(404).json({success:false, message:"Donation not found"});
        }
        if(donation.status !== "pending"){
            return res.status(400).json({success:false, message:"Donation is not available for acceptance"});
        }

        donation.acceptedByNgo = req.user.id;
        // flow: pending -> accepted
        donation.status = "accepted";

        if (volunteerId) {
            donation.volunteerId = volunteerId || null;
            // If we want to distinguish assigned vs accepted, we can, but user asked for PENDING -> ACCEPTED -> PICKED -> DELIVERED
        }

        donation.pickupStatusHistory.push({
            status: donation.status,
            updatedBy: req.user.id
        });

        await donation.save();

        const io = req.app.get('io');
        // Notify donor
        io.to(donation.donorId.toString()).emit('donation_accepted', {
            message: `Your donation "${donation.title}" has been accepted by a volunteer!`,
            donationId: donation._id,
            status: 'accepted'
        });
        // Broadcast to update lists potentially? Or just targeted.
        io.emit('donation_updated', donation);

        res.json({success:true, donation});
    }catch(err){
        console.error("Accept donation error:", err);
        res.status(500).json({success:false , message : "Server Error"});
    }
};

// Get all pickups assigned to the NGO
export const getNgoPickups = async(req,res)=>{
    try{
        const donations = await Donation.find({acceptedByNgo : req.user.id}).sort({createdAt:-1}).populate("volunteerId","name email").populate("donorId","name email");
        res.json({success:true,donations});
    }catch(err){
        res.status(500).json({success:false, message: "Server Error"});
    }
};

// Update pickup status by NGO
export const updatePickupStatus = async(req,res)=>{
    try{
        const donationId = req.params.id;
        const {status} = req.body;

        const allowedStatuses = ["accepted","picked","delivered","cancelled"];
        if(!allowedStatuses.includes(status)){
            return res.status(400).json({success:false, message:"Invalid Status Update"});
        }
        const donation = await Donation.findById(donationId);
        if(!donation){
            return res.status(404).json({success:false, message:"Donation not found"});
        }
        const isNgo = donation.acceptedByNgo ?.toString() === req.user.id;
        const isVolunteer = donation.volunteerId ?.toString() === req.user.id;

        if(!isNgo && !isVolunteer){
            return res.status(403).json({success:false, message:"Not authorized to update this donation"});
        }

        donation.status = status;
        donation.pickupStatusHistory.push({
            status,
            updatedBy: req.user.id
        });
        await donation.save();

        const io = req.app.get('io');
         // Notify donor
         io.to(donation.donorId.toString()).emit('pickup_status_updated', {
            message: `Donation "${donation.title}" status update: ${status}`,
            donationId: donation._id,
            status: status
        });
        io.emit('donation_updated', donation);

        res.json({success:true, donation});
    }catch(err){
        console.error("Update pickup status error:", err);
        res.status(500).json({success:false, message: "Server Error"});
    }
};
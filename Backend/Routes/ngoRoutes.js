import express from "express";
import {authmiddleware , requireRole} from "../middleware/authmiddleware.js";
import { getAllActiveDonations , acceptDonation,getNgoPickups,updatePickupStatus } from "../Controller/ngoController.js";

const router = express.Router();

router.use(authmiddleware , requireRole("receiver"));

router.get("/active-donations" , getAllActiveDonations);
router.post("/accept-donation/:id" , acceptDonation);
router.get("/pickups", getNgoPickups);
router.put("/update-pickup-status/:id" , updatePickupStatus);

export default router;
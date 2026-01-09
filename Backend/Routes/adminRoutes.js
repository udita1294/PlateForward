import express from "express";
import {getAdminStats,getAllUsers,deleteUser,getAllDonations,deleteDonation,} from "../Controller/adminController.js";
import { authmiddleware, requireRole } from "../middleware/authmiddleware.js";

const router = express.Router();

// Apply middleware to all admin routes
router.use(authmiddleware);
router.use(requireRole("admin"));

router.get("/stats", getAdminStats);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.get("/donations", getAllDonations);
router.delete("/donations/:id", deleteDonation);

export default router;

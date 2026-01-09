import express from 'express';
import { createDonation , getUserDonations } from '../Controller/donationController.js';
import {authmiddleware ,requireRole} from '../middleware/authmiddleware.js';
import {upload} from '../config/multer.js';
import { getMyDonations } from "../Controller/donationController.js";

const router = express.Router();

// All donation routes require logged-in donor or admin
router.use(authmiddleware, requireRole("donor", "admin"));
router.post('/create' , authmiddleware,upload.single('image') , createDonation);
// GET /api/donations/my-donations
router.get("/my-donations", getMyDonations);


export default router;
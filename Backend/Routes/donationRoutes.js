import express from 'express';
import { createDonation , getUserDonations } from '../Controller/donationController';
import authmiddleware from '../middleware/authmiddleware.js';
import {upload} from '../config/multer.js';

const router = express.Router();

router.post('/create' , authmiddleware,upload.single('image') , createDonation);
router.get('/my-donations' , authmiddleware , getUserDonations);

export default router;
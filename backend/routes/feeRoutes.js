import express from 'express';
import { addFee, getFees } from '../controllers/feeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, addFee)
    .get(protect, getFees);

export default router;

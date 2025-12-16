import express from 'express';
import { addNotice, getNotices } from '../controllers/noticeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, addNotice)
    .get(protect, getNotices);

export default router;

import express from 'express';
import { takeAttendance, getAttendance } from '../controllers/attendanceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, takeAttendance);

router.route('/:class')
    .get(protect, getAttendance);

export default router;

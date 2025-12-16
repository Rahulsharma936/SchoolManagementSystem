import express from 'express';
import { addRoutine, getRoutineByClass } from '../controllers/routineController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, addRoutine);

router.route('/:class')
    .get(protect, getRoutineByClass);

export default router;

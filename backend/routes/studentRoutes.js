import express from 'express';
import { addStudent, getStudents, getStudentByAdmission, deleteStudent } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, addStudent)
    .get(protect, getStudents);

router.get('/search/:admissionNumber', protect, getStudentByAdmission);
router.delete('/:id', protect, deleteStudent);

export default router;

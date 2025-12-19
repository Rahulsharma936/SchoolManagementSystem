import express from 'express';
import Attendance from '../models/Attendance.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get attendance for a class on a specific date
// @route   GET /api/attendance/:classId/:date
// @access  Private
router.get('/:classId/:date', protect, async (req, res) => {
    try {
        const { classId, date } = req.params;

        // Convert string date to Date object (start of day)
        const queryDate = new Date(date);
        queryDate.setHours(0, 0, 0, 0);

        // Find records for this class and date
        // Note: We might need to handle timezone issues, but assuming simple date match for now
        const records = await Attendance.find({
            class: classId,
            date: queryDate
        });

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error: error.message });
    }
});

// @desc    Mark/Update attendance
// @route   POST /api/attendance
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { date, class: classId, records } = req.body;

        const attendanceDate = new Date(date);
        attendanceDate.setHours(0, 0, 0, 0);

        // Process all records
        const promises = records.map(async (record) => {
            return Attendance.findOneAndUpdate(
                {
                    student: record.student,
                    date: attendanceDate
                },
                {
                    student: record.student,
                    date: attendanceDate,
                    class: classId,
                    status: record.status
                },
                { upsert: true, new: true }
            );
        });

        await Promise.all(promises);

        res.status(200).json({ message: 'Attendance updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating attendance', error: error.message });
    }
});

export default router;

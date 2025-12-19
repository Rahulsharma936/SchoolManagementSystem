import express from 'express';
import Attendance from '../models/Attendance.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

 
 
 
router.get('/:classId/:date', protect, async (req, res) => {
    try {
        const { classId, date } = req.params;

         
        const queryDate = new Date(date);
        queryDate.setHours(0, 0, 0, 0);

         
         
        const records = await Attendance.find({
            class: classId,
            date: queryDate
        });

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error: error.message });
    }
});

 
 
 
router.post('/', protect, async (req, res) => {
    try {
        const { date, class: classId, records } = req.body;

        const attendanceDate = new Date(date);
        attendanceDate.setHours(0, 0, 0, 0);

         
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

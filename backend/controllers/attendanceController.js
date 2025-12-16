import Attendance from '../models/Attendance.js';

// @desc    Take/Record attendance
// @route   POST /api/attendance
// @access  Private/Admin
const takeAttendance = async (req, res) => {
    const { date, class: className, records } = req.body;

    try {
        // Check if attendance already exists for this date and class, if so update or reject?
        // For simplicity, let's assume we create a new document or update if exists.
        // Let's just create new for now as per "take attendance" usually implies a daily action.

        // Check duplication for simple robustness
        const existingInterest = await Attendance.findOne({ date: new Date(date), class: className });
        if (existingInterest) {
            // If updating, logic would be different. Let's return error for now.
            return res.status(400).json({ message: 'Attendance already taken for this date and class' });
        }

        const attendance = new Attendance({
            date: new Date(date),
            class: className,
            records // Expecting array of { studentId, status }
        });

        const createdAttendance = await attendance.save();
        res.status(201).json(createdAttendance);
    } catch (error) {
        res.status(400).json({ message: 'Error taking attendance', error: error.message });
    }
};

// @desc    Get attendance by class and date (optional)
// @route   GET /api/attendance/:class
// @access  Private
const getAttendance = async (req, res) => {
    try {
        const { date } = req.query;
        let query = { class: req.params.class };

        if (date) {
            query.date = new Date(date);
        }

        const attendance = await Attendance.find(query).populate('records.student', 'name rollNumber');
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { takeAttendance, getAttendance };

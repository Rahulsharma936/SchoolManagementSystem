import Routine from '../models/Routine.js';

// @desc    Add routine item
// @route   POST /api/routines
// @access  Private/Admin
const addRoutine = async (req, res) => {
    const { class: className, day, period, subject, teacher, time } = req.body;

    try {
        const routine = new Routine({
            class: className,
            day,
            period,
            subject,
            teacher,
            time
        });

        const createdRoutine = await routine.save();
        res.status(201).json(createdRoutine);
    } catch (error) {
        res.status(400).json({ message: 'Invalid routine data', error: error.message });
    }
};

// @desc    Get routine by class
// @route   GET /api/routines/:class
// @access  Private
const getRoutineByClass = async (req, res) => {
    try {
        // Case insensitive/trim could be needed but keeping simple for now
        const routines = await Routine.find({ class: req.params.class }).sort({ day: 1, period: 1 });
        res.json(routines);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { addRoutine, getRoutineByClass };

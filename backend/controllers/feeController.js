import Fee from '../models/Fee.js';

// @desc    Add fee
// @route   POST /api/fees
// @access  Private/Admin
const addFee = async (req, res) => {
    const { student, amount, month, year, status } = req.body;

    try {
        const fee = new Fee({
            student,
            amount,
            month,
            year,
            status,
            datePaid: status === 'Paid' ? Date.now() : null
        });

        const createdFee = await fee.save();
        res.status(201).json(createdFee);
    } catch (error) {
        res.status(400).json({ message: 'Invalid fee data', error: error.message });
    }
};

// @desc    Get all fees
// @route   GET /api/fees
// @access  Private/Admin
const getFees = async (req, res) => {
    try {
        const fees = await Fee.find({}).populate('student', 'name admissionNumber rollNumber class');
        res.json(fees);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { addFee, getFees };

import Student from '../models/Student.js';
import Fee from '../models/Fee.js';

// @desc    Add a student
// @route   POST /api/students
// @access  Private/Admin
const addStudent = async (req, res) => {
    const { name, admissionNumber, rollNumber, class: className, gender, address, phone } = req.body;

    try {
        const student = new Student({
            name,
            admissionNumber,
            rollNumber,
            class: className,
            gender,
            address,
            phone
        });

        const createdStudent = await student.save();
        res.status(201).json(createdStudent);
    } catch (error) {
        res.status(400).json({ message: 'Invalid student data', error: error.message });
    }
};


// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin
const getStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get student by admission number
// @route   GET /api/students/search/:admissionNumber
// @access  Private/Admin
const getStudentByAdmission = async (req, res) => {
    try {
        const student = await Student.findOne({ admissionNumber: req.params.admissionNumber });

        if (student) {
            // Find the latest fee record for this student
            const latestFee = await Fee.findOne({ student: student._id }).sort({ createdAt: -1 });

            // Determine fee status (default to 'No Record' or take the status from the latest fee)
            const feeStatus = latestFee ? latestFee.status : 'No Record';

            res.json({
                ...student._doc,
                feeStatus
            });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (student) {
            await student.deleteOne();
            res.json({ message: 'Student removed' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export { addStudent, getStudents, getStudentByAdmission, deleteStudent };

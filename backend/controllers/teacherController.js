import Teacher from '../models/Teacher.js';

// @desc    Add a teacher
// @route   POST /api/teachers
// @access  Private/Admin
const addTeacher = async (req, res) => {
    const { name, subject, email, phone, address, salary } = req.body;

    try {
        const teacher = new Teacher({
            name,
            subject,
            email,
            phone,
            address,
            salary
        });

        const createdTeacher = await teacher.save();
        res.status(201).json(createdTeacher);
    } catch (error) {
        res.status(400).json({ message: 'Invalid teacher data', error: error.message });
    }
};

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private/Admin
const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a teacher
// @route   DELETE /api/teachers/:id
// @access  Private/Admin
const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (teacher) {
            await teacher.deleteOne();
            res.json({ message: 'Teacher removed' });
        } else {
            res.status(404).json({ message: 'Teacher not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export { addTeacher, getTeachers, deleteTeacher };

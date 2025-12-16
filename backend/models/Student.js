import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    admissionNumber: {
        type: String,
        required: true,
        unique: true,
    },
    rollNumber: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student;

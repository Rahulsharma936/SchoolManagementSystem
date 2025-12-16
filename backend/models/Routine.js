import mongoose from 'mongoose';

const routineSchema = new mongoose.Schema({
    class: {
        type: String,
        required: true,
    },
    day: {
        type: String, // e.g., Monday, Tuesday
        required: true,
    },
    period: {
        type: Number, // 1 to 8 maybe?
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    time: {
        type: String, // e.g. "10:00 AM - 11:00 AM"
    }
}, { timestamps: true });

const Routine = mongoose.model('Routine', routineSchema);

export default Routine;

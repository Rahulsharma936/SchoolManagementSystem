import mongoose from 'mongoose';

const routineSchema = new mongoose.Schema({
    class: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    period: {
        type: Number,  
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
        type: String, 
    }
}, { timestamps: true });

const Routine = mongoose.model('Routine', routineSchema);

export default Routine;

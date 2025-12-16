import mongoose from 'mongoose';

const feeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Paid', 'Pending'],
        default: 'Pending',
    },
    datePaid: {
        type: Date,
    }
}, { timestamps: true });

const Fee = mongoose.model('Fee', feeSchema);

export default Fee;

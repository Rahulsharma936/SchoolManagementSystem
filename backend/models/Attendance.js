import mongoose from 'mongoose';

const attendanceSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    class: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'Present'
    }
}, {
    timestamps: true
});

// Compound index to ensure one record per student per day
attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;

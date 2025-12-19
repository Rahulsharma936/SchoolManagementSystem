import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import feeRoutes from './routes/feeRoutes.js';
import routineRoutes from './routes/routineRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

 
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());

 
app.use('/api/users', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/routines', routineRoutes);
app.use('/api/attendance', attendanceRoutes);

 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

 
app.get('/', (req, res) => {
    res.send('API is running...');
});

 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


import Attendance from '../models/Attendance.js';

 
 
 
const takeAttendance = async (req, res) => {
    const { date, class: className, records } = req.body;

    try {
         
         
         

         
        const existingInterest = await Attendance.findOne({ date: new Date(date), class: className });
        if (existingInterest) {
             
            return res.status(400).json({ message: 'Attendance already taken for this date and class' });
        }

        const attendance = new Attendance({
            date: new Date(date),
            class: className,
            records  
        });

        const createdAttendance = await attendance.save();
        res.status(201).json(createdAttendance);
    } catch (error) {
        res.status(400).json({ message: 'Error taking attendance', error: error.message });
    }
};

 
 
 
const getAttendance = async (req, res) => {
    try {
        const { date } = req.query;
        let query = { class: req.params.class };

        if (date) {
            query.date = new Date(date);
        }

        const attendance = await Attendance.find(query).populate('records.student', 'name rollNumber');
        res.json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { takeAttendance, getAttendance };

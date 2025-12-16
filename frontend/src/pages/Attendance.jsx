import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Attendance = () => {
    const { user } = useAuth();
    const [selectedClass, setSelectedClass] = useState('1');
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchStudents();
    }, [selectedClass]);

    const fetchStudents = async () => {
        try {
            // Need a way to filter students by class in backend or frontend. 
            // For now fetching all and filtering in frontend (not efficient for large scale but fine for MVP).
            // Or I can add query param to student API.
            const { data } = await axios.get('http://localhost:5000/api/students', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            const classStudents = data.filter(s => s.class === selectedClass);
            setStudents(classStudents);

            // Initialize attendance data
            const initialAttendance = {};
            classStudents.forEach(s => {
                initialAttendance[s._id] = 'Present';
            });
            setAttendanceData(initialAttendance);
        } catch (error) {
            console.error(error);
        }
    };

    const handleStatusChange = (studentId, status) => {
        setAttendanceData(prev => ({ ...prev, [studentId]: status }));
    };

    const handleSubmit = async () => {
        const records = Object.keys(attendanceData).map(studentId => ({
            student: studentId,
            status: attendanceData[studentId]
        }));

        try {
            await axios.post('http://localhost:5000/api/attendance', {
                date: new Date(),
                class: selectedClass,
                records
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setMessage('Attendance saved successfully');
        } catch (error) {
            setMessage('Error saving attendance');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Take Attendance</h2>
            {message && <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">{message}</div>}

            <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-bold">Select Class</label>
                <div className="flex gap-2 flex-wrap">
                    {[...Array(10)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedClass((i + 1).toString())}
                            className={`px-4 py-2 rounded font-bold ${selectedClass === (i + 1).toString() ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            Class {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {students.map(student => (
                    <div key={student._id} className="bg-white p-6 rounded shadow flex flex-col items-center">
                        <div className="h-16 w-16 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-gray-600">
                            {student.name.charAt(0)}
                        </div>
                        <h3 className="font-bold text-lg">{student.name}</h3>
                        <p className="text-gray-500 mb-4">Roll: {student.rollNumber}</p>

                        <div className="flex gap-2 w-full">
                            <button
                                onClick={() => handleStatusChange(student._id, 'Present')}
                                className={`flex-1 py-2 rounded text-sm font-bold ${attendanceData[student._id] === 'Present' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                            >
                                Present
                            </button>
                            <button
                                onClick={() => handleStatusChange(student._id, 'Absent')}
                                className={`flex-1 py-2 rounded text-sm font-bold ${attendanceData[student._id] === 'Absent' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                            >
                                Absent
                            </button>
                        </div>
                    </div>
                ))}
                {students.length === 0 && <p className="col-span-full text-center text-gray-500">No students found for this class.</p>}
            </div>

            {students.length > 0 && (
                <button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded text-lg shadow-lg fixed bottom-8 right-8">
                    Submit Attendance
                </button>
            )}
        </div>
    );
};

export default Attendance;

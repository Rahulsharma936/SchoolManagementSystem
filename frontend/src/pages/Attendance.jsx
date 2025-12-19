import { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Attendance = () => {
    const { user } = useAuth();
    const [selectedClass, setSelectedClass] = useState('1');
    const [students, setStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (selectedClass) {
            fetchData();
        }
    }, [selectedClass, currentDate]);

    const fetchData = async () => {
        setLoading(true);
        setMessage('');
        try {
             
            const studentsRes = await api.get('/api/students');
            const classStudents = studentsRes.data.filter(s => s.class === selectedClass);

             
            const dateStr = currentDate.toISOString().split('T')[0];
            const attendanceRes = await api.get(`/api/attendance/${selectedClass}/${dateStr}`);
            const existingRecords = attendanceRes.data;

             
            const initialAttendance = {};

            classStudents.forEach(student => {
                const record = existingRecords.find(r => r.student === student._id);
                 
                initialAttendance[student._id] = record ? record.status : 'Present';
            });

            setStudents(classStudents);
            setAttendanceData(initialAttendance);
        } catch (error) {
            console.error(error);
            setMessage('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (studentId, status) => {
         
        setAttendanceData(prev => ({ ...prev, [studentId]: status }));

         
         
         
         
         
         
         
         
    };

    const handleSubmit = async () => {
        const records = Object.keys(attendanceData).map(studentId => ({
            student: studentId,
            status: attendanceData[studentId]
        }));

        try {
            await api.post('/api/attendance', {
                date: currentDate,
                class: selectedClass,
                records
            });
            setMessage('Attendance saved successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setMessage('Error saving attendance');
        }
    };

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 bg-white p-4 rounded shadow-sm inline-block">
                Take Attendance
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
                { }
                <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow h-fit">
                    <h3 className="text-xl font-bold mb-4 border-b pb-2">Select Class</h3>
                    <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                        {[...Array(12)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedClass((i + 1).toString())}
                                className={`px-4 py-3 rounded text-left font-semibold transition-colors duration-200 
                                    ${selectedClass === (i + 1).toString()
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'bg-gray-50 text-gray-700 hover:bg-blue-50'}`}
                            >
                                Class {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                { }
                <div className="w-full md:w-3/4">
                    { }
                    <div className="bg-white p-6 rounded-lg shadow mb-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-1">Class {selectedClass}</h3>
                            <p className="text-gray-500 text-lg">{formatDate(currentDate)}</p>
                        </div>
                        { }
                        <div className="mt-4 md:mt-0 flex gap-4 text-sm font-bold">
                            <span className="text-green-600 bg-green-50 px-3 py-1 rounded">
                                Present: {Object.values(attendanceData).filter(s => s === 'Present').length}
                            </span>
                            <span className="text-red-600 bg-red-50 px-3 py-1 rounded">
                                Absent: {Object.values(attendanceData).filter(s => s === 'Absent').length}
                            </span>
                        </div>
                    </div>

                    {message && <div className={`p-4 rounded mb-4 text-center font-bold ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{message}</div>}

                    {loading ? (
                        <div className="text-center py-10 text-gray-500">Loading...</div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="py-4 px-6 text-left">Roll No</th>
                                        <th className="py-4 px-6 text-left">Student Name</th>
                                        <th className="py-4 px-6 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {students.map((student) => (
                                        <tr key={student._id} className="hover:bg-gray-50">
                                            <td className="py-4 px-6 text-gray-700 font-medium w-1/6">
                                                {student.rollNumber || 'N/A'}
                                            </td>
                                            <td className="py-4 px-6 text-gray-900 font-bold text-lg w-2/6">
                                                {student.name}
                                            </td>
                                            <td className="py-4 px-6 text-center w-3/6">
                                                <div className="flex justify-center gap-4">
                                                    <button
                                                        onClick={() => handleStatusChange(student._id, 'Present')}
                                                        className={`flex-1 max-w-[120px] py-2 px-4 rounded transition-all duration-200 font-bold border-2 
                                                            ${attendanceData[student._id] === 'Present'
                                                                ? 'bg-green-600 text-white border-green-600 scale-105 shadow-md'
                                                                : 'bg-transparent text-gray-400 border-gray-200 hover:border-green-400 hover:text-green-500'}`}
                                                    >
                                                        Present
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(student._id, 'Absent')}
                                                        className={`flex-1 max-w-[120px] py-2 px-4 rounded transition-all duration-200 font-bold border-2
                                                            ${attendanceData[student._id] === 'Absent'
                                                                ? 'bg-red-600 text-white border-red-600 scale-105 shadow-md'
                                                                : 'bg-transparent text-gray-400 border-gray-200 hover:border-red-400 hover:text-red-500'}`}
                                                    >
                                                        Absent
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {students.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="py-10 text-center text-gray-500">
                                                No students found in Class {selectedClass}.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {students.length > 0 && (
                <div className="fixed bottom-6 right-6 z-10">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-2xl flex items-center gap-2 transform hover:scale-105 transition duration-300"
                    >
                        <span>Save Attendance</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Attendance;

import { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Classes = () => {
    const { user } = useAuth();
    const [selectedClass, setSelectedClass] = useState('1');
    const [routine, setRoutine] = useState([]);
    const [formData, setFormData] = useState({
        day: 'Monday',
        period: '',
        subject: '',
        teacher: '',
        time: ''
    });
    const [message, setMessage] = useState('');

    const fetchRoutine = async () => {
        try {
            const { data } = await api.get(`/api/routines/${selectedClass}`);
            setRoutine(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRoutine();
    }, [selectedClass]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/routines', { ...formData, class: selectedClass });
            setMessage('Routine added successfully');
            setFormData({ day: 'Monday', period: '', subject: '', teacher: '', time: '' });
            fetchRoutine();
        } catch (error) {
            setMessage('Error adding routine');
        }
    };

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Classes & Routine</h2>
            {message && <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">{message}</div>}

            <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-bold">Select Class to View/Edit Routine</label>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                { }
                <div className="lg:col-span-1 bg-white p-6 rounded shadow h-fit">
                    <h3 className="text-xl font-bold mb-4">Add Routine Item</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Day</label>
                            <select name="day" value={formData.day} onChange={handleChange} className="w-full border p-2 rounded">
                                {days.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Period (Number)</label>
                            <input type="number" name="period" value={formData.period} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Subject</label>
                            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Teacher</label>
                            <input type="text" name="teacher" value={formData.teacher} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Time (e.g. 10-11 AM)</label>
                            <input type="text" name="time" value={formData.time} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full font-bold">Add to Routine</button>
                    </form>
                </div>

                { }
                <div className="lg:col-span-2 bg-white p-6 rounded shadow">
                    <h3 className="text-xl font-bold mb-4">Class {selectedClass} Routine</h3>
                    {days.map(day => {
                        const dayRoutine = routine.filter(r => r.day === day).sort((a, b) => a.period - b.period);
                        if (dayRoutine.length === 0) return null;
                        return (
                            <div key={day} className="mb-6">
                                <h4 className="font-bold text-lg text-blue-600 border-b pb-2 mb-2">{day}</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    {dayRoutine.map(item => (
                                        <div key={item._id} className="flex justify-between items-center bg-gray-50 p-3 rounded hover:bg-gray-100 border">
                                            <div>
                                                <span className="font-bold text-gray-800">Period {item.period}: </span>
                                                <span className="font-medium">{item.subject}</span>
                                            </div>
                                            <div className="text-sm text-gray-500 text-right">
                                                <div>{item.teacher}</div>
                                                <div>{item.time}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                    {routine.length === 0 && <p className="text-gray-500">No routine found for this class.</p>}
                </div>
            </div>
        </div>
    );
};

export default Classes;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Fee = () => {
    const { user } = useAuth();
    const [fees, setFees] = useState([]);
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        student: '',
        amount: '',
        month: '',
        year: new Date().getFullYear().toString(),
        status: 'Pending'
    });
    const [message, setMessage] = useState('');

    const fetchFees = async () => {
        try {
            const { data } = await axios.get('/api/fees', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setFees(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStudents = async () => {
        try {
            const { data } = await axios.get('/api/students', {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setStudents(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchFees();
        fetchStudents();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/fees', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            });
            setMessage('Fee added successfully');
            setFormData({ student: '', amount: '', month: '', year: '', status: 'Pending' });
            fetchFees();
        } catch (error) {
            setMessage('Error adding fee');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Fee Management</h2>
            {message && <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">{message}</div>}

            <div className="bg-white p-6 rounded shadow mb-8">
                <h3 className="text-xl font-bold mb-4">Add Fee</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Student</label>
                        <select name="student" value={formData.student} onChange={handleChange} required className="w-full border p-2 rounded">
                            <option value="">Select Student</option>
                            {students.map(s => (
                                <option key={s._id} value={s._id}>{s.name} ({s.rollNumber})</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Amount</label>
                        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Month</label>
                        <input type="text" name="month" value={formData.month} onChange={handleChange} required className="w-full border p-2 rounded" placeholder="e.g. January" />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Year</label>
                        <input type="text" name="year" value={formData.year} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 rounded">
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <button type="submit" className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 font-bold">Add Fee Record</button>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-bold mb-4">Fee Records</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-3">Student</th>
                                <th className="p-3">Class</th>
                                <th className="p-3">Month/Year</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Date Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fees.map(fee => (
                                <tr key={fee._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{fee.student?.name}</td>
                                    <td className="p-3">{fee.student?.class}</td>
                                    <td className="p-3">{fee.month} {fee.year}</td>
                                    <td className="p-3">${fee.amount}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs ${fee.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {fee.status}
                                        </span>
                                    </td>
                                    <td className="p-3">{fee.datePaid ? new Date(fee.datePaid).toLocaleDateString() : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Fee;

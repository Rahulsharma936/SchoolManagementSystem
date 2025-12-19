import { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Fee = () => {
    const { user } = useAuth();
    const [fees, setFees] = useState([]);
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        studentName: '',
        admissionNumber: '',
        amount: '',
        month: '',
        year: new Date().getFullYear().toString(),
        status: 'Pending'
    });
    const [message, setMessage] = useState('');

    const fetchFees = async () => {
        try {
            const { data } = await api.get('/api/fees');
            setFees(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchStudents = async () => {
        try {
            const { data } = await api.get('/api/students');
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
        setMessage('');

         
        const foundStudent = students.find(s =>
            s.admissionNumber.toString().trim() === formData.admissionNumber.toString().trim()
        );

        if (!foundStudent) {
            setMessage('Error: Student with this Admission Number not found.');
            return;
        }

         
         

        try {
            const payload = {
                student: foundStudent._id,
                amount: formData.amount,
                month: formData.month,
                year: formData.year,
                status: formData.status
            };

            await api.post('/api/fees', payload);
            setMessage('Fee added successfully');
            setFormData({
                studentName: '',
                admissionNumber: '',
                amount: '',
                month: '',
                year: new Date().getFullYear().toString(),
                status: 'Pending'
            });
            fetchFees();
        } catch (error) {
            console.error(error);
            setMessage('Error adding fee');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Fee Management</h2>
            {message && <div className={`p-3 rounded mb-4 font-bold ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{message}</div>}

            <div className="bg-white p-6 rounded shadow mb-8">
                <h3 className="text-xl font-bold mb-4">Add Fee</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    { }
                    <div>
                        <label className="block text-gray-700 mb-2">Student Name</label>
                        <input
                            type="text"
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            placeholder="Enter Student Name"
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Admission Number</label>
                        <input
                            type="text"
                            name="admissionNumber"
                            value={formData.admissionNumber}
                            onChange={handleChange}
                            required
                            placeholder="Enter Admission No"
                            className="w-full border p-2 rounded"
                        />
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
                                <th className="p-3">Admission No</th>
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
                                    <td className="p-3 font-bold">{fee.student?.name || 'Unknown'}</td>
                                    <td className="p-3">{fee.student?.admissionNumber || '-'}</td>
                                    <td className="p-3">{fee.student?.class || '-'}</td>
                                    <td className="p-3">{fee.month} {fee.year}</td>
                                    <td className="p-3">${fee.amount}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${fee.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {fee.status}
                                        </span>
                                    </td>
                                    <td className="p-3">{fee.datePaid ? new Date(fee.datePaid).toLocaleDateString() : '-'}</td>
                                </tr>
                            ))}
                            {fees.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="p-4 text-center text-gray-500">No fee records found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Fee;

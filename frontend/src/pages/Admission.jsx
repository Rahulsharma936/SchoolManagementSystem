import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admission = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        admissionNumber: '',
        rollNumber: '',
        class: '1',
        gender: 'Male',
        address: '',
        phone: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            };

            await axios.post('/api/students', formData, config);
            setSuccess('Student admitted successfully!');
            setError('');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setSuccess('');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Student Admission</h2>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Admission Number</label>
                        <input type="text" name="admissionNumber" value={formData.admissionNumber} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Roll Number</label>
                        <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Class</label>
                        <select name="class" value={formData.class} onChange={handleChange} className="w-full border p-2 rounded">
                            {[...Array(10)].map((_, i) => (
                                <option key={i} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border p-2 rounded">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" rows="3"></textarea>
                </div>

                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full font-bold">Admit Student</button>
            </form>
        </div>
    );
};

export default Admission;

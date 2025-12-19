import { useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AddTeacher = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        email: '',
        phone: '',
        address: '',
        salary: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/teachers', formData);
            setSuccess('Teacher added successfully!');
            setError('');
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setSuccess('');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Teacher</h2>
            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full border p-2 rounded" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Phone</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Salary</label>
                    <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>

                <div>
                    <label className="block text-gray-700 mb-2">Address</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" rows="3"></textarea>
                </div>

                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full font-bold">Add Teacher</button>
            </form>
        </div>
    );
};

export default AddTeacher;

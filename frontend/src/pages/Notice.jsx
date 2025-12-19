import { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const Notice = () => {
    const { user } = useAuth();
    const [notices, setNotices] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [message, setMessage] = useState('');

    const fetchNotices = async () => {
        try {
            const { data } = await api.get('/api/notices');
            setNotices(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/notices', { ...formData, postedBy: user.name });
            setMessage('Notice posted successfully');
            setFormData({ title: '', content: '' });
            fetchNotices();
        } catch (error) {
            setMessage('Error posting notice');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Notice Board</h2>
            {message && <div className="bg-blue-100 text-blue-700 p-3 rounded mb-4">{message}</div>}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white p-6 rounded shadow h-fit">
                    <h3 className="text-xl font-bold mb-4">Post Notice</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Content</label>
                            <textarea name="content" value={formData.content} onChange={handleChange} required className="w-full border p-2 rounded" rows="4"></textarea>
                        </div>
                        <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 w-full font-bold">Post Notice</button>
                    </form>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-xl font-bold mb-4">Latest Notices</h3>
                    {notices.map(notice => (
                        <div key={notice._id} className="bg-white p-6 rounded shadow border-l-4 border-purple-500">
                            <h4 className="text-lg font-bold text-gray-800">{notice.title}</h4>
                            <p className="text-gray-600 mt-2">{notice.content}</p>
                            <div className="mt-4 text-sm text-gray-400 flex justify-between">
                                <span>Posted by: {notice.postedBy}</span>
                                <span>{new Date(notice.date).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notice;

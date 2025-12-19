import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Teachers = () => {
    const [teachers, setTeachers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchTeachers = async () => {
            if (!user) return;
            try {
                const res = await api.get('/api/teachers');
                setTeachers(res.data);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }
        };

        fetchTeachers();
    }, [user]);

    const handleDeleteTeacher = async (id) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            try {
                await api.delete(`/api/teachers/${id}`);
                setTeachers(teachers.filter(teacher => teacher._id !== id));
            } catch (error) {
                console.error("Error deleting teacher:", error);
                alert("Failed to delete teacher");
            }
        }
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Teachers</h1>
                <button
                    onClick={() => navigate('/add-teacher')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Teacher
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search Teacher by Name..."
                    className="w-full md:w-1/2 p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* List */}
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeachers.map((teacher) => (
                        <div key={teacher._id} className="border p-4 rounded hover:shadow-md transition bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800 mb-2">{teacher.name}</h3>
                            <div className="space-y-1 text-gray-600">
                                <p><span className="font-medium">Subject:</span> {teacher.subject}</p>
                                <p><span className="font-medium">Email:</span> {teacher.email}</p>
                                <p><span className="font-medium">Phone:</span> {teacher.phone}</p>
                                <button
                                    onClick={() => handleDeleteTeacher(teacher._id)}
                                    className="mt-2 text-red-600 hover:text-red-800 text-sm font-semibold"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    {filteredTeachers.length === 0 && (
                        <p className="col-span-full text-center text-gray-500 py-4">
                            {searchQuery ? 'No teachers found matching your search.' : 'No teachers added yet.'}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Teachers;

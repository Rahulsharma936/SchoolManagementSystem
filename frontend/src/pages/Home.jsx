import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchError, setSearchError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                 
                const studentsRes = await api.get('/api/students');
                setStudents(studentsRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user]);

    const handleSearch = async (e) => {
        e.preventDefault();
        setSearchError('');
        setSearchResult(null);

        if (!searchQuery.trim()) return;

        try {
            const res = await api.get(`/api/students/search/${searchQuery}`);
            setSearchResult(res.data);
        } catch (error) {
            setSearchError('Student not found or error occurred.');
            setSearchResult(null);
        }
    };

    const handleDeleteStudent = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await api.delete(`/api/students/${id}`);

                 
                setStudents(students.filter(student => student._id !== id));
                if (searchResult && searchResult._id === id) {
                    setSearchResult(null);
                    setSearchQuery('');
                }
            } catch (error) {
                console.error("Error deleting student:", error);
                alert("Failed to delete student");
            }
        }
    };

    const widgets = [
        {
            title: 'Student Admission',
            description: 'Click to admit a new student',
            action: () => navigate('/admission'),
            color: 'bg-blue-500'
        },
        {
            title: 'Add Teacher',
            description: 'Click to add a new teacher',
            action: () => navigate('/add-teacher'),
            color: 'bg-green-500'
        },
        {
            title: 'Fee Management',
            description: 'View and add fees',
            action: () => navigate('/fee'),
            color: 'bg-yellow-500'
        },
        {
            title: 'Notice Board',
            description: 'Post and view notices',
            action: () => navigate('/notice'),
            color: 'bg-purple-500'
        },
        {
            title: 'Take Attendance',
            description: 'Record daily attendance',
            action: () => navigate('/attendance'),
            color: 'bg-red-500'
        }
    ];

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {widgets.map((widget, index) => (
                        <div
                            key={index}
                            onClick={widget.action}
                            className={`${widget.color} text-white p-6 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition duration-300`}
                        >
                            <h3 className="text-2xl font-bold mb-2">{widget.title}</h3>
                            <p className="text-white text-opacity-80">{widget.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            { }
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Students Section</h2>

                { }
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h3 className="text-xl font-semibold mb-4">Search Student</h3>
                    <form onSubmit={handleSearch} className="flex gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Enter Admission Number"
                            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                            Search
                        </button>
                    </form>

                    {searchError && <p className="text-red-500">{searchError}</p>}

                    {searchResult && (
                        <div className="bg-gray-50 border p-4 rounded mt-4">
                            <h4 className="font-bold text-lg mb-2">Student Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <p><strong>Name:</strong> {searchResult.name}</p>
                                <p><strong>Class:</strong> {searchResult.class}</p>
                                <p><strong>Admission No:</strong> {searchResult.admissionNumber}</p>
                                <p><strong>Address:</strong> {searchResult.address}</p>
                                <p><strong>Fee Status:</strong>
                                    <span className={`ml-2 px-2 py-1 rounded text-sm ${searchResult.feeStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {searchResult.feeStatus}
                                    </span>
                                </p>
                            </div>
                            <button
                                onClick={() => handleDeleteStudent(searchResult._id)}
                                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                                Delete Student
                            </button>
                        </div>
                    )}
                </div>

                { }
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-4">Recently Added Students</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Admission No</th>
                                    <th className="p-2">Class</th>
                                    <th className="p-2">Roll No</th>
                                    <th className="p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.slice(-5).reverse().map((student) => (
                                    <tr key={student._id} className="border-b hover:bg-gray-50">
                                        <td className="p-2">{student.name}</td>
                                        <td className="p-2">{student.admissionNumber}</td>
                                        <td className="p-2">{student.class}</td>
                                        <td className="p-2">{student.rollNumber}</td>
                                        <td className="p-2">
                                            <button
                                                onClick={() => handleDeleteStudent(student._id)}
                                                className="text-red-600 hover:text-red-800 font-bold"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {students.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-4 text-center text-gray-500">No students added yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Home;

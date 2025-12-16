import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="bg-white shadow-md p-4 flex justify-between items-center z-10 sticky top-0">
            <div className="text-xl font-bold text-gray-800">Admin Dashboard</div>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="text-gray-600 font-medium">Hello, {user.name}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                        >
                            Sign Out
                        </button>
                    </>
                ) : (
                    <div className="text-sm text-gray-400">Not Logged In</div>
                )}
            </div>
        </div>
    );
};

export default Navbar;

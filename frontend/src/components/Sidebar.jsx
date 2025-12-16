import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const links = [
        { name: 'Home', path: '/' },
        { name: 'Classes', path: '/classes' },
        { name: 'Teachers', path: '/teachers' },
        { name: 'Fee', path: '/fee' },
        { name: 'Notice', path: '/notice' },
    ];

    return (
        <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col p-4">
            <div className="text-2xl font-bold mb-8 text-center border-b border-gray-700 pb-4">SMS Admin</div>
            <nav className="flex-1">
                <ul className="space-y-2">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link
                                to={link.path}
                                className={`block px-4 py-3 rounded transition ${location.pathname === link.path
                                    ? 'bg-blue-600 text-white'
                                    : 'hover:bg-gray-700 text-gray-300'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;

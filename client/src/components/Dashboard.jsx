import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/'); // Navigate to the login page
    };

    // Retrieve username from localStorage
    const userName = localStorage.getItem('userName');

    if (!userName) {
        // Redirect to login if username is not found
        navigate('/');
        return null; // Render nothing until redirection happens
    }

    return (
        <div className="bg-gray-100">
            <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
                <h1 className="text-xl font-bold">DashBoard</h1>
                <div className="flex items-center space-x-4">
                    <p>{userName}</p>
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                </div>
            </header>
            <main className="p-4">
                <nav className="mb-4">
                    <ul className="flex space-x-4">
                        <li>
                            <Link 
                                to="/dashboard/createEmploye" 
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Create Employee
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/dashboard/listEmploye" 
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Employee List
                            </Link>
                        </li>
                    </ul>
                </nav>
                <section className="bg-white p-4 rounded shadow-md">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default Dashboard;

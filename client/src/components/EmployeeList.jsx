import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import EmployeSearch from './EmployeSerach';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/v1/employeList');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setEmployees(data.data);
                setFilteredEmployees(data.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data. Please try again later.');
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleEdit = (employeeId) => {
        navigate(`/dashboard/updateEmploye/${employeeId}`);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/deleteEmploye/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();

            if (response.ok) {
                alert('User Deleted Successfully');
                setEmployees(employees.filter(employee => employee._id !== id));
                setFilteredEmployees(filteredEmployees.filter(employee => employee._id !== id));
            } else {
                throw new Error(data.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('An error occurred while deleting the user.');
        }
    };

    const handleSearch = (query) => {
        if (!query) {
            setFilteredEmployees(employees);
        } else {
            const filtered = employees.filter(employee =>
                employee.f_Name.toLowerCase().includes(query.toLowerCase()) ||
                employee.f_Email.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredEmployees(filtered);
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 mt-10">{error}</p>;
    }

    return (
        <>
            <Dashboard />
            <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-4">
                <div className="w-full max-w-7xl mt-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Employee List</h2>
                    <EmployeSearch onSearch={handleSearch} className="w-full mb-4" />
                    <div className="overflow-x-auto">
                        <table className="w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {['Employee ID', 'Name', 'Email', 'Mobile', 'Designation', 'Gender', 'Course', 'Created Date', 'Actions'].map(header => (
                                        <th
                                            key={header}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredEmployees.map((employee) => (
                                    <tr key={employee._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.f_Id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.f_Name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.f_Email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.f_Mobile}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.f_Designation}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.f_gender}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{employee.f_Course}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(employee.f_Createdate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap space-x-2">
                                            <button
                                                onClick={() => handleEdit(employee._id)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(employee._id)}
                                                className="bg-pink-400 text-white px-3 py-1 rounded ml-2 hover:bg-pink-300"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeList;

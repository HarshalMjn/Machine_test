import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './Dashboard';

const EmployeeEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        f_Id: '',
        f_Image: '',
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_gender: '',
        f_Course: '',
        f_Createdate: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEmployee = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/employe/${id}`);
                const data = response.data.data;
                setEmployee({
                    f_Id: data.f_Id,
                    f_Image: data.f_Image,
                    f_Name: data.f_Name,
                    f_Email: data.f_Email,
                    f_Mobile: data.f_Mobile,
                    f_Designation: data.f_Designation,
                    f_gender: data.f_gender,
                    f_Course: data.f_Course,
                    f_Createdate: data.f_Createdate
                });
                setLoading(false);
            } catch (error) {
                setError('Error fetching employee details. Please try again later.');
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`http://localhost:4000/api/v1/updateEmploye/${id}`, employee);
            if (response.data.success) {
                alert('Employee details updated successfully');
                navigate('/dashboard/listEmploye');
            } else {
                throw new Error(response.data.message || 'Failed to update employee');
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            setError('Failed to update employee. Please try again.');
            setLoading(false);
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
        <Dashboard/>
         <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-gray-700">Employee ID:</label>
                    <input type="text" name="f_Id" value={employee.f_Id} onChange={handleChange} readOnly className="mt-1 p-2 border border-gray-300 rounded" />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700">Name:</label>
                    <input type="text" name="f_Name" value={employee.f_Name} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded" />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700">Email:</label>
                    <input type="email" name="f_Email" value={employee.f_Email} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded" />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700">Mobile:</label>
                    <input type="text" name="f_Mobile" value={employee.f_Mobile} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded" />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700">Designation:</label>
                    <select name="f_Designation" value={employee.f_Designation} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded">
                        <option value="">Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700">Gender:</label>
                    <div className="flex mt-1 space-x-2">
                        <label className="flex items-center">
                            <input type="radio" name="f_gender" value="Male" checked={employee.f_gender === 'Male'} onChange={handleChange} required className="mr-1" /> Male
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="f_gender" value="Female" checked={employee.f_gender === 'Female'} onChange={handleChange} className="mr-1" /> Female
                        </label>
                        <label className="flex items-center">
                            <input type="radio" name="f_gender" value="Other" checked={employee.f_gender === 'Other'} onChange={handleChange} className="mr-1" /> Other
                        </label>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700">Course:</label>
                    <select name="f_Course" value={employee.f_Course} onChange={handleChange} required className="mt-1 p-2 border border-gray-300 rounded">
                        <option value="">Select Course</option>
                        <option value="MCA">MCA</option>
                        <option value="BCA">BCA</option>
                        <option value="BSC">BSC</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700">Created Date:</label>
                    <input type="text" name="f_Createdate" value={employee.f_Createdate} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded" />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4">
                    Update Employee
                </button>
            </form>
        </div>
        </>
       
    );
};

export default EmployeeEdit;

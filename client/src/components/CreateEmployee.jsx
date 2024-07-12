import React, { useState } from 'react';
import Dashboard from './Dashboard';

const CreateEmployee = () => {
    const initialFormData = {
        f_Id: '',
        f_Image: '',
        f_Name: '',
        f_Email: '',
        f_Mobile: '',
        f_Designation: '',
        f_gender: '',
        f_Course: '',
        f_Createdate: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [message, setMessage] = useState('');

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/v1/createEmploye', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Something went wrong');
            }

            const result = await response.json();

            if (response.status === 200) {
                setMessage('Employee created successfully');
                setFormData(initialFormData); 
                alert('Employee created successfully'); 
            } else {
                setMessage(result.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to create employee. Please try again.');
        }
    };

    return (
        <>
            <Dashboard />
            <div className="bg-gray-100 flex flex-col items-center pt-4">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-center">Create Employee</h2>
                    {message && <p className="text-red-500 mb-4">{message}</p>}
                    <form onSubmit={handleOnSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Employee ID:</label>
                            <input 
                                type="text" 
                                name="f_Id" 
                                value={formData.f_Id} 
                                onChange={handleOnChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Image URL:</label>
                            <input 
                                type="text" 
                                name="f_Image" 
                                value={formData.f_Image} 
                                onChange={handleOnChange} 
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name:</label>
                            <input 
                                type="text" 
                                name="f_Name" 
                                value={formData.f_Name} 
                                onChange={handleOnChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email:</label>
                            <input 
                                type="email" 
                                name="f_Email" 
                                value={formData.f_Email} 
                                onChange={handleOnChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Mobile:</label>
                            <input 
                                type="text" 
                                name="f_Mobile" 
                                value={formData.f_Mobile} 
                                onChange={handleOnChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Designation:</label>
                            <select 
                                name="f_Designation" 
                                value={formData.f_Designation} 
                                onChange={handleOnChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select Designation</option>
                                <option value="HR">HR</option>
                                <option value="Manager">Manager</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Gender:</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="f_gender" 
                                        value="Male" 
                                        onChange={handleOnChange} 
                                        required 
                                        className="mr-2"
                                    /> Male
                                </label>
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="f_gender" 
                                        value="Female" 
                                        onChange={handleOnChange} 
                                        className="mr-2"
                                    /> Female
                                </label>
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="f_gender" 
                                        value="Other" 
                                        onChange={handleOnChange} 
                                        className="mr-2"
                                    /> Other
                                </label>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Course:</label>
                            <select 
                                name="f_Course" 
                                value={formData.f_Course} 
                                onChange={handleOnChange} 
                                required 
                                className="w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select Course</option>
                                <option value="MCA">MCA</option>
                                <option value="BCA">BCA</option>
                                <option value="BSC">BSC</option>
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Create Employee
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateEmployee;

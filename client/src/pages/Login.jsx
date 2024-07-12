import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
    const [formData, setFormData] = useState({
        f_userName: "",
        f_Pwd: "",
    });
    const { f_userName, f_Pwd } = formData;
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }

            localStorage.setItem('token', result.token);
            localStorage.setItem('userName', result.user.f_userName); 

            console.log('Success:', result);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-richblack-800"> {/* Set the background color */}
            <form 
                onSubmit={handleOnSubmit} 
                className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
            >
                <h2 className="mb-6 text-2xl font-semibold text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        User Name
                        <input
                            required
                            type='text'
                            name='f_userName'
                            value={f_userName}
                            onChange={handleOnChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                </div>
                <div className="mb-6 relative">
                    <label className="block text-sm font-medium text-gray-700">
                        Password
                        <input
                            required
                            type={showPassword ? 'text' : 'password'}
                            name='f_Pwd'
                            value={f_Pwd}
                            onChange={handleOnChange}
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span 
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute right-3 top-9 cursor-pointer"
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </label>
                </div>
                <button 
                    type='submit' 
                    className="w-full px-4 py-2 font-semibold text-white bg-blue-500  rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    Log in
                </button>
                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default Login;


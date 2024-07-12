import React from 'react';

const EmployeSearch = ({ onSearch }) => {
    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className="mt-4 mb-8">
            <input
                type="text"
                placeholder="Search employees..."
                onChange={handleSearchChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
        </div>
    );
};

export default EmployeSearch;

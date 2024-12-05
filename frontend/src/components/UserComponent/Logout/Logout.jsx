// src/components/Logout.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { clearUserData } from '../../../redux/userSlice.js';
import { Button } from '../../ui/button';

const Logout = () => {
    const dispatch = useDispatch();

    // Function to handle logout
    const handleLogout = () => {
        console.log("inside Handle Logout");
        dispatch(clearUserData()); // Dispatch action to clear user data
        // Optionally, you could redirect the user to the login page or home page after logout
        // For example: navigate('/login'); (if using react-router)
    };

    return (
        <div className="logout-container">
            <Button onClick={handleLogout} variant="secondary" className=" text-white">
                Logout
            </Button>
        </div>
    );
};

export default Logout;

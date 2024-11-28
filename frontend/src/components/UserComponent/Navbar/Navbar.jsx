import React from 'react';
import { Button } from "@/components/ui/button"; // Ensure this matches your ShadCN alias setup
import Logout from '../Logout/Logout';

const Navbar = () => {
    return (
        <nav className="bg-white-800 text-white py-4 px-6 flex justify-between items-center">
            {/* Logo Section */}
            <div className="text-lg font-bold">
                <a href="/" className="hover:text-gray-300">
                    ExamSystem
                </a>
            </div>

            {/* Navigation Links */}
            <div className="space-x-4 hidden md:flex">
                <a href="/home" className="hover:text-gray-300">
                    Home
                </a>
                <a href="/profile" className="hover:text-gray-300">
                    Profile
                </a>
                <a href="/help" className="hover:text-gray-300">
                    Help
                </a>
            </div>
            
            {/* Logout Button */}
            <div className="flex items-center space-x-2">
                <Logout />
            </div>
        </nav>
    );
};

export default Navbar;

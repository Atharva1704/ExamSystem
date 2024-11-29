import React from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout.jsx";

const StudentNavbar = () => {
    return (
        <nav className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center shadow-md">
            {/* Title */}
            <div className="text-xl font-bold">
                <Link to="/">ExamSystem</Link>
            </div>
            {/* Links */}
            <div className="flex space-x-4">
                <Link
                    to="/exam"
                    className="hover:bg-blue-700 px-3 py-2 rounded transition duration-200"
                >
                    Exam
                </Link>
                <Link
                    to="/result"
                    className="hover:bg-blue-700 px-3 py-2 rounded transition duration-200"
                >
                    Result
                </Link>
                <Logout />
            </div>
        </nav>
    );
};

export default StudentNavbar;

import React from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";

const AcadNavbar = () => {
    return (
        <nav className="bg-teal-600 text-white px-4 py-2 flex justify-between items-center shadow-md">
            {/* Title */}
            <div className="text-xl font-bold">
                <Link to="/">ExamSystem</Link>
            </div>
            {/* Links */}
            <div className="flex space-x-4">
                <Link
                    to="/fetch-approved"
                    className="hover:bg-teal-700 px-3 py-2 rounded transition duration-200"
                >
                    Fetch Approved
                </Link>
                <Logout />
            </div>
        </nav>
    );
};

export default AcadNavbar;

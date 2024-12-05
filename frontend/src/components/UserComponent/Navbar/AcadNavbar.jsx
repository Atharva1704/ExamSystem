import React from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import RoleSwitcher from "../RoleSwitcher/RoleSwitcher.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedRole } from "../../../redux/userSlice";

const AcadNavbar = () => {
    const dispatch = useDispatch();

    // Get roles and selectedRole from Redux store
    const { role: roles, selectedRole } = useSelector((state) => state.user);

    // Ensure selectedRole is valid, or default to the first available role
    const validRoles = roles || []; // Ensure roles is an array
    const activeRole = validRoles.includes(selectedRole) ? selectedRole : validRoles[0] || null;

    React.useEffect(() => {
        // If activeRole is invalid, set the first available role as selectedRole
        if (activeRole !== selectedRole) {
            dispatch(setSelectedRole({ selectedRole: activeRole }));
        }
    }, [activeRole, selectedRole, dispatch]);
    return (
        <nav className="bg-white-600 text-white px-4 py-2 flex justify-between items-center shadow-md">
            {/* Title */}
            <div className="text-xl font-bold">
                <Link to="/" className="text-blue-500">
                    ExamSystem
                </Link>
            </div>
            {/* Links */}
            <div className="flex space-x-4">
                <Link
                    to="/set-exam-start"
                    className="text-blue-500 hover:bg-teal-700 px-3 py-2 rounded transition duration-200"
                >
                    Set Start Time
                </Link>

                <Link
                    to="/fetch-approved"
                    className="text-blue-500 hover:bg-teal-700 px-3 py-2 rounded transition duration-200"
                >
                    Fetch Approved
                </Link>

                {/* Role Switcher */}
                <RoleSwitcher roles={validRoles} activeRole={activeRole} />
                <Logout />
            </div>
        </nav>

    );
};

export default AcadNavbar;

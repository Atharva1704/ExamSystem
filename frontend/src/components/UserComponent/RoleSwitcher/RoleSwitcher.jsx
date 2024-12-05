import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedRole } from "../../../redux/userSlice";

// Helper function to map role numbers to names
const getRoleName = (role) => {
    const roleNames = {
        1: "Student",
        2: "Professor",
        3: "Head of Department",
        4: "Academic Coordinator",
    };
    return roleNames[role] || "Unknown Role";
};

const RoleSwitcher = () => {
    const dispatch = useDispatch();

    // Get the user's roles and activeRole from Redux store
    const { role: userRoles, selectedRole } = useSelector((state) => state.user);

    // Ensure the roles array contains valid roles
    const availableRoles = userRoles ? userRoles : [];

    const handleRoleChange = (event) => {
        const selectedRole = parseInt(event.target.value, 10);
        dispatch(setSelectedRole({ selectedRole }));
    };

    return (
        <div className="my-2">
            {/* <h3 className="text-xl font-semibold text-center mb-4">Switch Role</h3> */}
            {availableRoles.length > 1 ? (
                <select
                    value={selectedRole || ""}
                    onChange={handleRoleChange}
                    className="block w-full text-white max-w-sm mx-auto bg-black border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {availableRoles.map((role) => (
                        <option key={role} value={role}>
                            {getRoleName(role)}
                        </option>
                    ))}
                </select>
            ) : (
                <p className="text-center text-gray-500">
                    You only have one role: {getRoleName(selectedRole)}
                </p>
            )}
        </div>
    );
};

export default RoleSwitcher;

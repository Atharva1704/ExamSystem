import React from "react";
import StudentNavbar from "../Navbar/StudentNavbar";
import ProfNavbar from "../Navbar/ProfNavbar";
import HoDNavbar from "../Navbar/HoDNavbar";
import AcadNavbar from "../Navbar/AcadNavbar";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedRole } from "../../../redux/userSlice";

const HomePage = () => {
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

    // Navbar rendering based on activeRole
    const renderNavbar = () => {
        switch (activeRole) {
            case 1:
                return <StudentNavbar />;
            case 2:
                return <ProfNavbar />;
            case 3:
                return <HoDNavbar />;
            case 4:
                return <AcadNavbar />;
            default:
                return null; // No navbar if no valid role
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            {renderNavbar()}

            {/* Main Content */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Welcome Section */}
                    <h1 className="text-4xl font-bold text-center mb-8">
                        Welcome to ExamSystem
                    </h1>
                    <p className="text-center text-lg text-gray-600 mb-12">
                        Your one-stop platform for managing exams, grievances, and academic processes.
                    </p>

                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
                &copy; Built By Atharva Chavan (atharva2003chavan@gmail.com)
            </footer>
        </div>
    );
};

export default HomePage;

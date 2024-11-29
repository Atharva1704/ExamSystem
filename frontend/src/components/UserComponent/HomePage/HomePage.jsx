import React from "react";
import { useSelector } from "react-redux";
import StudentNavbar from "../Navbar/StudentNavbar";
import ProfNavbar from "../Navbar/ProfNavbar";
import HoDNavbar from "../Navbar/HoDNavbar";
import AcadNavbar from "../Navbar/AcadNavbar";

const HomePage = () => {
    // Get the user's role from the Redux store
    // console.log("Backend URL:", process.env.BACKEND_URL);

    const userRole = useSelector((state) => state.user.role);
    // Render the appropriate Navbar based on the role
    const renderNavbar = () => {
        switch (userRole) {
            case "student":
                return <StudentNavbar />;
            case "Professor":
                return <ProfNavbar />;
            case "Head_of_Department":
                return <HoDNavbar />;
            case "Academic_Coordinator":
                return <AcadNavbar />;
            default:
                return null; // No navbar for undefined roles
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
                    <div className="bg-red-500 text-red p-4">
                        Tailwind is working!
                    </div>
                    <div className="bg-primary text-red p-4">
                        This is a div with the primary background color.
                    </div>
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

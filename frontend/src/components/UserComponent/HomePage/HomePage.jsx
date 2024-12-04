import React from "react";
import StudentNavbar from "../Navbar/StudentNavbar";
import ProfNavbar from "../Navbar/ProfNavbar";
import HoDNavbar from "../Navbar/HoDNavbar";
import AcadNavbar from "../Navbar/AcadNavbar";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedRole } from "../../../redux/userSlice";
import InfiniteScrollAnimation from "@/components/ui/InfiniteScrollAnimation/InfiniteScrollAnimation";

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
                    <section className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Welcome to ExamSystem</h1>
                        <p className="text-lg text-gray-600">
                            Your one-stop platform for managing exams, grievances, and academic processes.
                        </p>
                    </section>

                    {/* How It Works */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-center mb-6">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-4 border rounded shadow hover:shadow-lg">
                                <h3 className="text-xl font-bold mb-2">1. Exam Creation</h3>
                                <p>
                                    Professors create exams. A unique <b>sessionId</b> is generated for every course.
                                </p>
                            </div>
                            <div className="p-4 border rounded shadow hover:shadow-lg">
                                <h3 className="text-xl font-bold mb-2">2. Exam Scheduling</h3>
                                <p>
                                    Academic Coordinators schedule the exam start time for students to attempt.
                                </p>
                            </div>
                            <div className="p-4 border rounded shadow hover:shadow-lg">
                                <h3 className="text-xl font-bold mb-2">3. Student Submissions</h3>
                                <p>
                                    Students attempt the exam and submit answers. Professors evaluate the submissions.
                                </p>
                            </div>
                            <div className="p-4 border rounded shadow hover:shadow-lg">
                                <h3 className="text-xl font-bold mb-2">4. Result Approval</h3>
                                <p>
                                    HoD approves results based on the professor's evaluation.
                                </p>
                            </div>
                            <div className="p-4 border rounded shadow hover:shadow-lg">
                                <h3 className="text-xl font-bold mb-2">5. Result Publication</h3>
                                <p>
                                    Academic Coordinators publish results, making them accessible to students.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Stakeholders */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-center mb-6">Stakeholders</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-2">Students</h3>
                                <p>Attempt exams, view results, and submit grievances.</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-2">Professors</h3>
                                <p>Create exams and evaluate submissions.</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-2">HoD</h3>
                                <p>Approve evaluated results for publication.</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-bold mb-2">Academic Coordinator</h3>
                                <p>Schedule exams and publish results.</p>
                            </div>
                        </div>
                    </section>


                </div>
            </main>
            {/* <InfiniteScrollAnimation /> */}
            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center py-4">
                Built By Atharva Chavan (atharva2003chavan@gmail.com)
            </footer>
        </div>
    );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../ui/button"; // Assuming you're using a custom button component
import { useNavigate } from "react-router-dom"; // For navigation
import axiosInstance from "../../utils/AxiosInstance.js"; // Ensure the path is correct

const ExamComponent = () => {
    // Get the user's email from Redux state
    const userEmail = useSelector((state) => state.user.email);
    const [exams, setExams] = useState([]); // To store the list of exams
    const [loading, setLoading] = useState(true); // Loading state while fetching exams
    const [error, setError] = useState(null); // Error state if something goes wrong
    const navigate = useNavigate(); // Hook to navigate programmatically

    useEffect(() => {
        // Fetch exams for the student based on email
        const fetchExams = async () => {
            try {
                // Use axiosInstance
                const response = await axiosInstance.get(`/student/${userEmail}`);
                console.log(response.data.exams);
                setExams(response.data.exams); // Assuming the response contains an array of exam details
                setLoading(false); // Stop loading
            } catch (error) {
                setError("Failed to fetch exams");
                setLoading(false); // Stop loading
            }
        };

        if (userEmail) {
            fetchExams();
        }
    }, [userEmail]);

    // Function to handle the exam start
    const handleStartExam = async (sessionId) => {
        try {
            // Fetch the exam start time and check if it has already passed
            const response = await axiosInstance.get(`/student/fetch/${sessionId}`);
            const exam = response.data.exam; // Assuming response contains exam details
            console.log(exam);
            const currentTime = new Date();
            const startTime = new Date(exam.startTime);

            if (currentTime >= startTime) {
                // If the start time has passed, navigate to the exam page
                navigate(`/exam/${sessionId}`);
            } else {
                alert("The exam has not started yet.");
            }
        } catch (error) {
            alert("Failed to fetch exam details.");
        }
    };

    if (loading) {
        return <div className="text-center text-gray-600 text-xl">Loading exams...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 text-xl">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Available Exams</h1>
            {exams.length === 0 ? (
                <p className="text-center text-lg text-gray-600">No exams available.</p>
            ) : (
                <ul className="space-y-6">
                    {exams.map((exam) => (
                        <li
                            key={exam.sessionId}
                            className="flex flex-col items-start p-6 bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                        >
                            <div className="flex justify-between w-full">
                                <span className="text-xl font-semibold text-gray-800">{exam.courseCode}</span>
                                <span className="text-lg text-gray-600">{exam.sessionId}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">{exam.description}</p>
                            <div className="flex items-center justify-between w-full mt-4">
                                <span className="text-sm text-gray-500">
                                    Duration: {exam.durationOfExam} minutes
                                </span>
                                <span className="text-sm text-gray-500">
                                    Start Time: {new Date(exam.startTime).toLocaleString()}
                                </span>
                            </div>
                            <Button
                                onClick={() => handleStartExam(exam.sessionId)}
                                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
                            >
                                Start Exam
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExamComponent;

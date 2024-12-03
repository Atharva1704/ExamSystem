import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance"; // Ensure the path to axiosInstance is correct
import { selectUser } from "../../../redux/userSlice"; // Adjust the path if needed

const ResultSession = () => {
    const { sessionId } = useParams(); // Capture sessionId from URL
    const { email: professorEmail } = useSelector(selectUser); // Fetch professor email from Redux store
    const [submissions, setSubmissions] = useState([]);
    const [hodEmail, setHodEmail] = useState(""); // HOD Email State
    const [academicCoordinatorEmail, setAcademicCoordinatorEmail] = useState(""); // Academic Coordinator Email State
    const [marks, setMarks] = useState({}); // Store marks for each question per student

    useEffect(() => {
        // Fetch submissions when component mounts
        const fetchSubmissions = async () => {
            try {
                const response = await axiosInstance.get(`/professor/fetch-submission-exams/${sessionId}`);
                console.log("response is: ", response.data.submissions);
                setSubmissions(response.data.submissions);
            } catch (error) {
                console.error("Error fetching submissions:", error);
                alert("Failed to fetch submissions.");
            }
        };
        fetchSubmissions();
    }, [sessionId]);

    const handleMarksChange = (studentEmail, questionId, value) => {
        // Update marks state for each question
        setMarks((prev) => ({
            ...prev,
            [studentEmail]: {
                ...(prev[studentEmail] || {}),
                [questionId]: value,
            },
        }));
    };

    const handleSubmitMarks = async (studentEmail) => {
        const cumulativeMarks = Object.values(marks[studentEmail] || {}).reduce(
            (sum, mark) => sum + Number(mark),
            0
        );
        const courseCode = sessionId.slice(0, 5);
        try {
            const response = await axiosInstance.post(`/professor/submit-marks/${studentEmail}`, {
                sessionId,
                courseCode, // Derived courseCode
                marks: cumulativeMarks,
                professorEmail, // Professor email from Redux store
                hodEmail,
                academicCoordinatorEmail,
            });
            alert("Marks submitted successfully!");
        } catch (error) {
            console.error("Error submitting marks:", error);
            alert("Failed to submit marks.");
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="mb-6 p-4 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Set HOD and Academic Coordinator Emails</h1>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700">HOD Email</label>
                        <input
                            type="email"
                            value={hodEmail}
                            onChange={(e) => setHodEmail(e.target.value)}
                            className="w-full bg-white border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Academic Coordinator Email</label>
                        <input
                            type="email"
                            value={academicCoordinatorEmail}
                            onChange={(e) => setAcademicCoordinatorEmail(e.target.value)}
                            className="w-full bg-white border p-2 rounded"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Submissions for Session: {sessionId}</h2>
                {submissions.map((submission) => (
                    <div key={submission.studentEmail} className="mb-6">
                        <h3 className="font-bold text-gray-800">
                            Student: {submission.studentEmail}
                        </h3>
                        <div className="space-y-4 mt-4">
                            {Object.entries(submission.answers).map(([questionId, answer]) => (
                                <div key={questionId} className="space-y-2">
                                    <p className="text-gray-700">
                                        <strong>Question {questionId}:</strong> {answer}
                                    </p>
                                    <input
                                        type="number"
                                        placeholder="Marks"
                                        value={marks[submission.studentEmail]?.[questionId] || ""}
                                        onChange={(e) =>
                                            handleMarksChange(
                                                submission.studentEmail,
                                                questionId,
                                                e.target.value
                                            )
                                        }
                                        className="w-full bg-white border p-2 rounded"
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => handleSubmitMarks(submission.studentEmail)}
                            className="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                        >
                            Submit Marks
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultSession;

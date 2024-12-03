import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../utils/axiosInstance"; // Adjust the path as necessary
import { useSelector } from "react-redux";

const ExamPage = () => {
    const { sessionId } = useParams(); // Get sessionId from URL
    const userEmail = useSelector((state) => state.user.email); // Get student email from Redux state
    const jwtToken = useSelector((state) => state.user.jwtToken); // Get JWT token from Redux state
    const [examDetails, setExamDetails] = useState(null); // To store exam details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state if something goes wrong
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch exam details based on sessionId
        const fetchExamDetails = async () => {
            try {
                const response = await axiosInstance.get(`/student/fetch/${sessionId}`);
                // Only store the required fields from the response
                const { courseCode, questions } = response.data.exam;
                setExamDetails({
                    courseCode,
                    questions,
                });
                setLoading(false); // Stop loading
            } catch (error) {
                setError("Failed to fetch exam details.");
                setLoading(false); // Stop loading
            }
        };

        if (sessionId) {
            fetchExamDetails();
        }
    }, [sessionId]);

    const formik = useFormik({
        initialValues: {
            answers: {}, // To store the answers, keyed by question number
        },
        validationSchema: Yup.object({
            answers: Yup.object().shape(
                Object.fromEntries(
                    Object.keys(examDetails?.questions || {}).map((key) => [
                        key,
                        Yup.string().required("Answer is required for this question"),
                    ])
                )
            ),
        }),
        onSubmit: async (values) => {
            try {
                // Send the submission data with JWT token in the Authorization header
                const response = await axiosInstance.post(
                    `/student/submit-exam`,
                    {
                        studentEmail: userEmail,
                        sessionId,
                        answers: values.answers,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`, // Add JWT token in Authorization header
                        },
                    }
                );
                alert("Exam submitted successfully!");
                navigate("/exam"); // Redirect to /exam after successful submission
            } catch (error) {
                alert(`Failed to submit the exam. ${error.response?.data?.message}`);
            }
        },
    });

    if (loading) {
        return <div>Loading exam details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">Exam: {examDetails.courseCode}</h1>
            <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Answer the following questions</h2>

                <form onSubmit={formik.handleSubmit}>
                    <div className="space-y-4">
                        {Object.entries(examDetails.questions).map(([questionNumber, questionText]) => (
                            <div key={questionNumber} className="mb-4">
                                <label htmlFor={`answers[${questionNumber}]`} className="block text-lg font-semibold">
                                    {`${questionNumber}: ${questionText}`}
                                </label>
                                <textarea
                                    id={`answers[${questionNumber}]`}
                                    name={`answers[${questionNumber}]`}
                                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formik.values.answers[questionNumber] || ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    rows="4"
                                />

                                {formik.touched.answers?.[questionNumber] && formik.errors.answers?.[questionNumber] && (
                                    <div className="text-red-500 text-sm">{formik.errors.answers[questionNumber]}</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-700 focus:outline-none"
                    >
                        Submit Exam
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ExamPage;

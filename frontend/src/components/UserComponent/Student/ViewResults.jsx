import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice"; // Update the path as needed
import axiosInstance from "../../utils/AxiosInstance.js"; // Adjust the path if necessary

const ViewResult = () => {
    const { email: studentEmail } = useSelector(selectUser); // Fetch student email from Redux store
    const [sessionId, setSessionId] = useState(""); // State for session ID input
    const [result, setResult] = useState(null); // State to hold fetched result
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Function to fetch the result
    const fetchResult = async () => {
        if (!sessionId) {
            alert("Please enter a session ID.");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axiosInstance.post(
                `/student/view-result/${sessionId}`,
                { studentEmail } // Send student email in the body
            );
            console.log(response.data);
            setResult(response.data); // Set fetched result
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch result.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">View Result</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter Session ID"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    className="border bg-white border-gray-300 rounded p-2 w-full mb-2"
                />
                <button
                    onClick={fetchResult}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                    disabled={loading}
                >
                    {loading ? "Fetching..." : "Fetch Result"}
                </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}

            {result && (
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">
                        Result for Session: {sessionId}
                    </h2>
                    <p className="text-gray-600">
                        <span className="font-medium">Marks Obtained:</span>{" "}
                        {result.marks}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Professor:</span>{" "}
                        {result.professorEmail}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">HOD:</span>{" "}
                        {result.hodEmail}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Academic Coordinator:</span>{" "}
                        {result.academicCoordinatorEmail}
                    </p>
                    <p className="text-gray-600">
                        <span className="font-medium">Coordinator Approval:</span>{" "}
                        {result.academicCoordinatorApproval ? "Yes" : "No"}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ViewResult;

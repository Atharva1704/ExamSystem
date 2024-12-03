import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice"; // Update the path as needed
import axiosInstance from "../../utils/AxiosInstance.js"; // Path to your Axios instance

const FetchApproved = () => {
    const [approvedResults, setApprovedResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch the academic coordinator email from the Redux store
    const { email: academicCoordinatorEmail } = useSelector(selectUser);

    // Fetch all approved results
    const fetchApprovedResults = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get("/acad/fetch-approved-results"); // Use Axios instance
            console.log(response.data.results);
            setApprovedResults(response.data.results);
        } catch (err) {
            setError("Failed to fetch approved results");
        } finally {
            setLoading(false);
        }
    };

    const approveResult = async (sessionId) => {
        if (!sessionId) {
            alert("Session ID is missing!");
            return;
        }
        console.log(approvedResults);
        if (!academicCoordinatorEmail) {
            alert("Academic coordinator email is missing!");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await axiosInstance.put(`/acad/approve-result/${sessionId}`, {
                academicCoordinatorEmail,
            });
            setApprovedResults((prevResults) =>
                prevResults.filter((result) => result.sessionId !== sessionId)
            );
            alert(`Session ${sessionId} approved successfully.`);
        } catch (err) {
            setError("Failed to approve the result");
        } finally {
            setLoading(false);
        }
    };

    // Fetch results on component mount
    useEffect(() => {
        fetchApprovedResults();
    }, []);

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Approved Results
            </h1>
            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && approvedResults.length === 0 && (
                <p className="text-gray-600">No approved results found.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {approvedResults.map((result) => (
                    <div
                        key={result.sessionId}
                        className="bg-white p-4 shadow rounded-lg"
                    >
                        <h2 className="text-xl font-semibold text-gray-700">
                            Session ID: {result.sessionId}
                        </h2>
                        <p className="text-gray-600">
                            Professor: {result.professorEmail}
                        </p>
                        <p className="text-gray-600">
                            HOD Approval:{" "}
                            {result.hodApproval ? "Yes" : "No"}
                        </p>
                        <p className="text-gray-600">
                            Coordinator Approval:{" "}
                            {result.academicCoordinatorApproval ? "Yes" : "No"}
                        </p>
                        <button
                            onClick={() => approveResult(result.sessionId)}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Approve
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FetchApproved;

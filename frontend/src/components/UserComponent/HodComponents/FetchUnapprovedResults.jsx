import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { selectUser } from "../../../redux/userSlice.js";

const FetchUnapprovedResults = () => {
    const [unapprovedResults, setUnapprovedResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { email: hodEmail } = useSelector(selectUser);

    // Fetch unapproved results
    const fetchResults = async () => {
        if (!hodEmail) {
            setError("HOD email is missing in Redux state.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/hod/fetch-unapproved-results/${hodEmail}`
            );
            console.log(response.data);
            setUnapprovedResults(response.data);
        } catch (err) {
            setError("Failed to fetch unapproved results");
        } finally {
            setLoading(false);
        }
    };

    // Approve a result
    const approveResult = async (result) => {
        if (!hodEmail || !result.sessionId || !result.professorEmail || !result.academicCoordinatorEmail) {
            alert("Missing required information for approval.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/hod/approve-result-hod`,
                {
                    sessionId: result.sessionId,
                    hodEmail,
                    academicCoordinatorEmail: result.academicCoordinatorEmail,
                    professorEmail: result.professorEmail, // Pass professorEmail
                }
            );
            console.log(response);
            alert(`Session ${result.sessionId} approved successfully!`);

            // Remove approved result from the list
            setUnapprovedResults((prevResults) =>
                prevResults.filter((r) => r.sessionId !== result.sessionId)
            );
        } catch (err) {
            setError("Failed to approve result");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, [hodEmail]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Unapproved Results</h1>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && unapprovedResults.length === 0 && (
                <p className="text-gray-500">No unapproved results found.</p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {unapprovedResults.map((result) => (
                    <div
                        key={result.sessionId}
                        className="bg-white p-4 rounded shadow"
                    >
                        <h2 className="text-lg font-semibold">
                            Session ID: {result.sessionId}
                        </h2>
                        <p>Course Code: {result.courseCode}</p>
                        <p>Professor: {result.professorEmail}</p>
                        <p>
                            Students Evaluated:{" "}
                            {result.studentsEvaluated || 0}
                        </p>
                        <button
                            onClick={() => approveResult(result)}
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

export default FetchUnapprovedResults;

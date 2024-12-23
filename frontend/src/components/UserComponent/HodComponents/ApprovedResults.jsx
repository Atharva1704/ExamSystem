import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/AxiosInstance.js"; // Adjust the path as needed

const ApprovedResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch approved results when the component mounts
        const fetchApprovedResults = async () => {
            try {
                console.log("Fetching approved results...");
                const response = await axiosInstance.get("/hod/fetch-approved-result"); // API endpoint
                console.log(response);
                setResults(response.data.results);
            } catch (err) {
                console.error("Error fetching approved results:", err);
                setError("Failed to load approved results.");
            } finally {
                setLoading(false);
            }
        };

        fetchApprovedResults();
    }, []);

    if (loading) {
        return <div>Loading approved results...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="mb-6 p-4 bg-white rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Approved Results</h1>
                {results.length > 0 ? (
                    <div className="space-y-4">
                        {results.map((result) => (
                            <div key={result.sessionId} className="bg-white p-4 rounded shadow-md mb-4">
                                <h2 className="text-lg font-semibold">{`Session ID: ${result.sessionId}`}</h2>
                                <p>
                                    <strong>Professor:</strong> {result.professorEmail}
                                </p>
                                <p>
                                    <strong>HOD Approval:</strong> {result.hodApproval ? "Approved" : "Pending"}
                                </p>
                                <p>
                                    <strong>Academic Coordinator Approval:</strong>{" "}
                                    {result.academicCoordinatorApproval ? "Approved" : "Pending"}
                                </p>
                                <p>
                                    <strong>Approval Date:</strong> {new Date(result.approvalDate).toLocaleString()}
                                </p>
                                <div>
                                    <h3 className="font-semibold">Marks:</h3>
                                    <ul>
                                        {result.marks &&
                                            Object.entries(result.marks).map(([studentEmail, marks]) => (
                                                <li key={studentEmail}>
                                                    {studentEmail}: {marks}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No approved results found.</p>
                )}
            </div>
        </div>
    );
};

export default ApprovedResults;

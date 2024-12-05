import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance.js"; // Ensure the path is correct

const SessionList = () => {
    const navigate = useNavigate();
    const { email: professorEmail } = useSelector(selectUser); // Get professor's email from Redux state
    const [sessionIds, setSessionIds] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!professorEmail) return;

        const fetchSessionIds = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axiosInstance.get(`/professor/fetch-my-exams/${professorEmail}`);
                setSessionIds(response.data.sessionIds);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch session IDs.");
            } finally {
                setLoading(false);
            }
        };

        fetchSessionIds();
    }, [professorEmail]);

    const handleCheckResult = (sessionId) => {
        navigate(`/check-exam/${sessionId}`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Session IDs</h1>

            {loading ? (
                <p className="text-gray-600">Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : sessionIds.length === 0 ? (
                <p className="text-gray-600">No session IDs found.</p>
            ) : (
                <div className="w-full max-w-3xl bg-white rounded shadow p-4">
                    <ul className="space-y-4">
                        {sessionIds.map((sessionId) => (
                            <li
                                key={sessionId}
                                className="flex items-center justify-between bg-gray-50 p-4 rounded shadow-md"
                            >
                                <span className="text-gray-800 font-medium">{sessionId}</span>
                                <button
                                    onClick={() => handleCheckResult(sessionId)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Check Result
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SessionList;

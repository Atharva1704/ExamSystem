import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/AxiosInstance.js"; // Ensure the path is correct

const SetStart = () => {
    const [exams, setExams] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await axiosInstance.get("/acad/undefined-start-time"); // Use axiosInstance
                setExams(response.data);
            } catch (error) {
                console.error("Error fetching exams:", error);
            }
        };

        fetchExams();
    }, []);

    const handleSetStartTime = async (sessionId) => {
        if (!startTime) {
            alert("Please provide a valid start time.");
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.put(
                `/acad/set-start-time/${sessionId}`,
                { startTime }
            );

            if (response.status === 200) {
                alert("Start time updated successfully.");
                setExams((prevExams) =>
                    prevExams.filter((exam) => exam.sessionId !== sessionId)
                );
            } else {
                alert("Failed to update start time.");
            }
        } catch (error) {
            console.error("Error updating start time:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Set Exam Start Time</h1>
            {exams.length === 0 ? (
                <p className="text-gray-600">No exams found with undefined start time.</p>
            ) : (
                exams.map((exam) => (
                    <div key={exam.sessionId} className="p-4 bg-white rounded shadow-md">
                        <h2 className="text-lg font-semibold">{exam.courseCode}</h2>
                        <p>{exam.description}</p>
                        <p className="text-sm text-gray-500">Session ID: {exam.sessionId}</p>
                        <div className="mt-4">
                            <input
                                type="datetime-local"
                                className="p-2 border rounded w-full bg-white"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                            <button
                                onClick={() => handleSetStartTime(exam.sessionId)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Set Start Time"}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default SetStart;

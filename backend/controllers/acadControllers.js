import ApprovedResult from "../models/ApprovedResults.js"; // Import ApprovedResults model
import Result from "../models/Result.js"; // Import Result schema
import Exam from "../models/Exam.js";

export const approveResult = async (req, res) => {
    try {
        const { sessionId } = req.params; // Get the sessionId from the URL params
        const { academicCoordinatorEmail } = req.body; // Get the academic coordinator email from request body

        // Validate inputs  
        if (!sessionId || !academicCoordinatorEmail) {
            return res.status(400).json({ message: "Session ID and academic coordinator email are required." });
        }

        // Find the result document for the given sessionId in the Result schema
        const result = await Result.findOne({ sessionId });

        if (!result) {
            return res.status(404).json({ message: "Result not found for this session ID." });
        }

        // Update the academic coordinator approval field in the Result schema
        result.academicCoordinatorApproval = true;
        await result.save(); // Save changes to Result schema

        // Find the corresponding document in the ApprovedResult schema
        let approvedResult = await ApprovedResult.findOne({ sessionId });

        // If the result doesn't exist in the ApprovedResult schema, create a new entry
        if (!approvedResult) {
            approvedResult = new ApprovedResult({
                sessionId,
                courseCode: result.courseCode,
                professorEmail: result.professorEmail,
                hodEmail: result.hodEmail,
                academicCoordinatorEmail: result.academicCoordinatorEmail,
                marksObtained: result.marksObtained,
                studentsEvaluated: result.studentsEvaluated,
                academicCoordinatorApproval: true,
            });
            await approvedResult.save(); // Save new approved result
        } else {
            // Update the academic coordinator approval field in the ApprovedResult schema
            approvedResult.academicCoordinatorApproval = true;
            await approvedResult.save(); // Save changes to ApprovedResult schema
        }

        // Send a success response
        res.status(200).json({
            message: "Result approved by academic coordinator successfully.",
            result,
        });
    } catch (error) {
        res.status(500).json({ message: "Error approving result", error: error.message });
    }
};

// Controller to fetch all results where academic coordinator approval is false
export const fetchAllApprovedResults = async (req, res) => {
    try {
        // Fetch all results where academicCoordinatorApproval is false
        const results = await ApprovedResult.find({ academicCoordinatorApproval: false });
        console.log(results);

        // If no results are found, return a 404 response
        if (results.length === 0) {
            return res.status(404).json({ message: "No results awaiting academic coordinator approval." });
        }
        // Return the results in the response
        res.status(200).json({
            message: "Fetched results awaiting academic coordinator approval.",
            results,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching results", error: error.message });
    }
};


// Controller function to update the start time of an exam
export const updateExamStartTime = async (req, res) => {
    try {
        const { sessionId } = req.params; // Extract the sessionId from route params
        const { startTime } = req.body; // Extract startTime from the request body

        // Validate the startTime
        if (!startTime || isNaN(new Date(startTime).getTime())) {
            return res.status(400).json({ message: "Invalid or missing start time." });
        }

        // Find the exam by sessionId and update the start time
        const updatedExam = await Exam.findOneAndUpdate(
            { sessionId: sessionId }, // Search by sessionId
            { startTime: new Date(startTime) }, // Update the startTime field
            { new: true, runValidators: true } // Return the updated document and validate before saving
        );

        // If exam not found
        if (!updatedExam) {
            return res.status(404).json({ message: "Exam not found" });
        }

        // Send success response with the updated exam details
        res.status(200).json({
            message: "Exam start time updated successfully",
            exam: updatedExam, // Return the updated exam document
        });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: "Error updating start time", error: error.message });
    }
};


export const getUndefinedStartTime = async (req, res) => {
    try {
        const exams = await Exam.find({ startTime: { $exists: false } }); // Fetch exams with undefined startTime
        res.status(200).json(exams);
    } catch (error) {
        console.error("Error fetching exams with undefined start time:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
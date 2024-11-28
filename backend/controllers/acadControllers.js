import ApprovedResult from "../models/ApprovedResults.js"; // Import ApprovedResults model
import Result from "../models/Result.js"; // Import Result schema

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

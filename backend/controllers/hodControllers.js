import Complaint from "../models/Complaint.js";
import ApprovedResult from "../models/ApprovedResults.js";
import Result from "../models/Result.js";

// Controller to approve the result by HOD
export const approveResultByHod = async (req, res) => {
    try {
        const { sessionId, hodEmail, academicCoordinatorEmail, professorEmail } = req.body;
        // console.log("Approved Result:", req.body);
        // Find the approved result by sessionId
        let approvedResult = await ApprovedResult.findOne({ sessionId });
        console.log("Approved Result:", approvedResult);
        // If the result doesn't exist, create a new one
        if (!approvedResult) {
            console.log("inside not approved");
            approvedResult = new ApprovedResult({
                sessionId,
                hodApproval: true, // HOD approves the session
                academicCoordinatorApproval: false, // Not approved by academic coordinator yet
                approvalDate: Date.now(),
                professorEmail: req.body.professorEmail, // Assuming professorEmail is passed in the body
            });

            await approvedResult.save();
        } else {
            // If HOD hasn't approved yet, approve it
            if (!approvedResult.hodApproval) {
                approvedResult.hodApproval = true;
                approvedResult.approvalDate = Date.now();
                await approvedResult.save();
            }
        }
        // Update the Result schema to set hodApproval as true
        const resultUpdate = await Result.findOneAndUpdate(
            { sessionId },
            { hodApproval: true },
            { new: true } // Return the updated document
        );

        if (!resultUpdate) {
            return res.status(404).json({
                message: "Result not found in Result schema for updating HOD approval.",
            });
        }

        res.status(200).json({
            message: "Result approved by HOD successfully",
            approvedResult,
            updatedResult: resultUpdate,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error approving result by HOD", error: error.message });
    }
};

export const fetchResults = async (req, res) => {
    try {
        const { hodEmail } = req.params; // Get HOD email from the route params
        console.log("Inside ");
        if (!hodEmail) {
            return res.status(400).json({ message: "HOD email is required" });
        }

        // Fetch results where hodEmail matches and hodApproval is false
        const results = await Result.find({ hodEmail, hodApproval: false });
        // console.log(results);
        if (results.length === 0) {
            return res
                .status(404)
                .json({ message: "No results pending HOD approval found." });
        }

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: "Error fetching results", error: error.message });
    }
};

// Controller to fetch unresolved complaints
export const fetchUnresolvedComplaints = async (req, res) => {
    try {
        // Query for all unresolved complaints
        const unresolvedComplaints = await Complaint.find({ resolved: false });

        // If no unresolved complaints are found
        if (unresolvedComplaints.length === 0) {
            return res.status(404).json({ message: "No unresolved complaints found." });
        }

        // Return the unresolved complaints in the response
        res.status(200).json({
            message: "Unresolved complaints fetched successfully",
            unresolvedComplaints,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching unresolved complaints", error: error.message });
    }
};



export const getApprovedResults = async (req, res) => {
    try {
        // Fetch all approved results, sorted by approvalDate in reverse order
        console.log("inside approved results");
        const results = await ApprovedResult.find().sort({ approvalDate: -1 });

        // If no results found, return a 404 response
        if (results.length === 0) {
            return res.status(404).json({ message: "No approved results found." });
        }

        // Return the results
        res.status(200).json({
            message: "Approved results fetched successfully.",
            results,
        });
    } catch (error) {
        console.error("Error fetching approved results:", error);
        res.status(500).json({ message: "Error fetching approved results.", error: error.message });
    }
};

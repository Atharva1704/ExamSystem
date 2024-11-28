import Complaint from "../models/Complaint.js";
import ApprovedResult from "../models/ApprovedResults.js";

// Controller to approve the result by HOD
export const approveResultByHod = async (req, res) => {
  try {
    const { sessionId, hodEmail, academicCoordinatorEmail } = req.body;

    // Find the approved result by sessionId
    let approvedResult = await ApprovedResult.findOne({ sessionId });

    // If the result doesn't exist, create a new one
    if (!approvedResult) {
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

    res.status(200).json({
      message: "Result approved by HOD successfully",
      approvedResult,
    });
  } catch (error) {
    res.status(500).json({ message: "Error approving result by HOD", error: error.message });
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

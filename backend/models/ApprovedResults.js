import mongoose from "mongoose";

// Define the schema for Approved Results
const approvedResultSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String, // The session ID for the exam
            required: true,
            unique: true,
        },
        hodApproval: {
            type: Boolean, // Whether the HOD has approved the session
            default: false,
        },
        academicCoordinatorApproval: {
            type: Boolean, // Whether the Academic Coordinator has approved the session
            default: false,
        },
        approvalDate: {
            type: Date, // The date when the result was approved
            default: Date.now,
        },
        marks: {
            type: Map,
            of: Number, // Marks for students as key-value pairs (studentId -> marks)
            required: false,
        },
        professorEmail: {
            type: String, // The email of the professor for the exam
            required: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

// Create the model for the schema
const ApprovedResult = mongoose.model("ApprovedResult", approvedResultSchema);

export default ApprovedResult;

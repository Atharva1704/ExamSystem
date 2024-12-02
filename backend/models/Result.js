import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        sessionId: {
            type: String,
            required: true,
        },
        courseCode: {
            type: String,
            required: true,
        },
        marksObtained: {
            type: Map,
            of: Number, // Mapping student email to their marks
            required: false,
        },
        professorEmail: {
            type: String,
            required: true, // Email of the professor who created the result
        },
        hodEmail: {
            type: String,
            required: true, // Email of the HOD (optional field)
        },
        academicCoordinatorEmail: {
            type: String,
            required: false, // Email of the academic coordinator (optional field)
        },
        studentsEvaluated: {
            type: Number,
            default: 0, // Keeps track of how many students' marks have been entered
        },
        academicCoordinatorApproval: {
            type: Boolean,
            default: false, // Track if the academic coordinator has approved the result
        },
        hodApproval: {
            type: Boolean,
            default: false, // Track if the HOD has approved the result
        },
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

const Result = mongoose.model("Result", resultSchema);

export default Result;

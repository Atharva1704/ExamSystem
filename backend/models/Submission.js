import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        studentEmail: {
            type: String,
            required: true,
        },
        sessionId: {
            type: String, // sessionId is a string now
            required: true,
        },
        answers: {
            type: Map,
            of: String, // Answers stored as key-value pairs, e.g., {1: "Answer A", 2: "Answer B"}
            required: true,
        },
        submittedAt: {
            type: Date,
            default: Date.now, // Automatically records the time when the submission is created
        },
    },
    { timestamps: true } // Adds `createdAt` and `updatedAt` fields
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;

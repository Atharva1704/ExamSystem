import mongoose from "mongoose";

// Define the Exam schema
const examSchema = new mongoose.Schema(
    {
        courseCode: {
            type: String,
            required: true,
        },
        paperSetter: {
            type: String, // Assuming email ID for paper setter
            required: true,
            match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please provide a valid email address'], // Valid email regex
        },
        questions: {
            type: Map,
            of: String, // The key is the question number, and the value is the question text.
            required: true,
        },
        answerkey: {
            type: Map,
            of: String, // The key is the question number, and the value is the correct answer.
            required: true,
        },
        studentsEnrolled: [{
            type: String, // Assuming each student is identified by their email or student ID
            required: true,
        }],
        durationOfExam: {
            type: Number, // Duration of exam in minutes
            required: true,
        },
        description: {
            type: String, // Optional field for additional exam details
            default: "", // Sets default to an empty string if not provided
        },
        sessionId: {
            type: String, // Unique identifier for the exam session
            required: true,
            unique: true, // Ensures no duplicate session IDs
            default: function () {
                return `${this.courseCode}-${Math.random().toString(36).substring(2, 10)}`; // Generates sessionId like "CS101-xyz123"
            },
        },
        startTime: {
            type: Date, // Timestamp for when the exam starts
            required: true, // Ensure start time is provided
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt` timestamps
    }
);

// Create the model from the schema
const Exam = mongoose.model("Exam", examSchema);

export default Exam;

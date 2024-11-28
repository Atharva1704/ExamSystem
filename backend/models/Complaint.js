import mongoose from "mongoose";

// Define the Complaint schema
const complaintSchema = new mongoose.Schema(
    {
        studentEmail: {
            type: String,
            required: true, // Required to identify which student raised the complaint
            match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 'Please provide a valid email address'],
        },
        courseCode: {
            type: String,
            required: true, // Required to identify which exam/course the complaint is related to
        },
        sessionId: {
            type: String,
            required: true, // To link the complaint to the specific exam session
        },
        complaintType: {
            type: String,
            enum: ['Recheck', 'Other'], // Could be 'Recheck' or 'Other' types of complaints
            required: true,
        },
        grievanceDescription: {
            type: String,
            required: true, // Description of the issue the student is raising
        },
        complaintDate: {
            type: Date,
            default: Date.now, // Automatically capture when the complaint is submitted
        },
        resolved: {
            type: Boolean,
            default: false, // To track if the complaint has been resolved or not
        },
        resolvedBy: {
            type: String,
            default: null, // The email of the person who resolved the complaint (if applicable)
        },
        resolutionDate: {
            type: Date,
            default: null, // The date when the complaint was resolved (if applicable)
        },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the model from the schema
const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;

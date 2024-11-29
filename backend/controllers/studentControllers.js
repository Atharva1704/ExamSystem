import Exam from "../models/Exam.js";
import Submission from "../models/Submission.js";
import Result from "../models/Result.js";
import Complaint from "../models/Complaint.js";

// Controller to submit a complaint
export const submitComplaint = async (req, res) => {
    try {
        const { studentEmail, courseCode, sessionId, complaintType, grievanceDescription } = req.body;

        // Validate inputs
        if (!studentEmail || !courseCode || !sessionId || !complaintType || !grievanceDescription) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create the complaint
        const complaint = new Complaint({
            studentEmail,
            courseCode,
            sessionId,
            complaintType,
            grievanceDescription,
        });

        // Save the complaint to the database
        await complaint.save();

        // Send a success response
        res.status(201).json({
            message: "Complaint submitted successfully",
            complaint,
        });
    } catch (error) {
        res.status(500).json({ message: "Error submitting complaint", error: error.message });
    }
};
export const viewResult = async (req, res) => {
    try {
        const { sessionId } = req.params;  // Get sessionId from the request params
        const { studentEmail } = req.body;  // Assuming student's email is provided in the body

        // Validate if studentEmail is provided
        if (!studentEmail) {
            return res.status(400).json({ message: "Student email is required." });
        }

        // Sanitize the student email by replacing '.' with '_'
        const sanitizedEmail = studentEmail.replace(/\./g, "_");

        // Find the result for the given sessionId
        const result = await Result.findOne({ sessionId });

        // If result doesn't exist, return an error message
        if (!result) {
            return res.status(404).json({ message: "Result not found for the given session." });
        }

        // Check if the academic coordinator has approved the result
        if (!result.academicCoordinatorApproval) {
            return res.status(403).json({ message: "The result has not been approved by the academic coordinator yet." });
        }

        // Check if the student's marks are available in the marksObtained map
        const studentMarks = result.marksObtained.get(sanitizedEmail);

        if (studentMarks === undefined) {
            return res.status(404).json({ message: "Marks not found for the student in this session." });
        }

        // Return the result with the student's marks
        res.status(200).json({
            message: "Result fetched successfully",
            marks: studentMarks,
            professorEmail: result.professorEmail,
            hodEmail: result.hodEmail,
            academicCoordinatorEmail: result.academicCoordinatorEmail,
            academicCoordinatorApproval: result.academicCoordinatorApproval
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching result", error: error.message });
    }
};

// Controller to submit the exam
export const submitExam = async (req, res) => {
    try {
        const { studentEmail, sessionId, answers } = req.body;

        // Validate inputs
        if (!studentEmail || !sessionId || !answers) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if the exam exists using the sessionId
        const exam = await Exam.findOne({ sessionId });
        if (!exam) {
            return res.status(404).json({ message: "Exam not found for the given session ID." });
        }

        // Check if the student has already submitted for this exam
        const existingSubmission = await Submission.findOne({ studentEmail, sessionId });
        if (existingSubmission) {
            return res.status(400).json({ message: "You have already submitted this exam." });
        }

        // Create and save the submission
        const submission = new Submission({
            studentEmail,
            sessionId,
            answers,
        });
        await submission.save();

        res.status(201).json({
            message: "Exam submitted successfully",
            submission,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error submitting exam",
            error: error.message,
        });
    }
};

// Controller to fetch the exam based on sessionId
export const fetchExam = async (req, res) => {
    try {
        const { sessionId } = req.params;

        // Fetch the exam by sessionId
        const exam = await Exam.findOne({ sessionId });

        if (!exam) {
            return res.status(404).json({ message: "Exam not found for the given session ID." });
        }

        // Send the exam details in the response
        res.status(200).json({
            message: "Exam fetched successfully",
            exam,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching exam",
            error: error.message,
        });
    }
};

// Function to search exams by student email
export const getStudentExamSessions = async (req, res) => {
    try {
        const { emailId } = req.params; // Extract the emailId from the route params

        // Query the database to find exams where the student is enrolled
        const exams = await Exam.find({ "studentsEnrolled": emailId }, "sessionId courseCode durationOfExam description startTime");

        // Map over the results to extract required data
        const examDetails = exams.map((exam) => ({
            sessionId: exam.sessionId,
            courseCode: exam.courseCode,
            durationOfExam: exam.durationOfExam,
            description: exam.description,
            startTime: exam.startTime,
        }));

        // Return the array of session details
        res.status(200).json({
            success: true,
            exams: examDetails,
        });
    } catch (error) {
        console.error("Error fetching exams for student:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching exams.",
        });
    }
};

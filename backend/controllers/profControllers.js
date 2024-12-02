import Exam from "../models/Exam.js";
import Submission from "../models/Submission.js";
import Result from "../models/Result.js";


export const submitMarksOfOneStudent = async (req, res) => {
    try {
        const { sessionId, courseCode, marks, professorEmail, hodEmail, academicCoordinatorEmail } = req.body;
        const { studentEmail } = req.params; // Get the student's email from the URL parameters

        // Validate inputs
        if (!sessionId || !courseCode || marks === undefined || !professorEmail || !hodEmail || !academicCoordinatorEmail) {
            return res.status(400).json({ message: "Session ID, course code, marks, and email details are required." });
        }

        // Sanitize the student email by replacing '.' with '_'
        const sanitizedEmail = studentEmail.replace(/\./g, "_");

        // Find the result document for the given sessionId and courseCode
        let result = await Result.findOne({ sessionId, courseCode });

        // If the result doesn't exist, create a new one
        if (!result) {
            result = new Result({
                sessionId,
                courseCode,
                professorEmail,
                hodEmail: hodEmail,
                academicCoordinatorEmail,
                marksObtained: new Map(),
                studentsEvaluated: 0,
            });

            // Save the newly created result
            await result.save();
        }

        // Check if marks for the student already exist
        if (result.marksObtained.has(sanitizedEmail)) {
            return res.status(400).json({ message: "Marks already submitted for this student." });
        }

        // Add the marks for the student to the marksObtained map
        result.marksObtained.set(sanitizedEmail, marks);

        // Increment the number of students evaluated
        result.studentsEvaluated += 1;

        // Save the updated result
        await result.save();

        // Send a success response with the updated result
        res.status(200).json({
            message: "Marks submitted successfully",
            result,
        });
    } catch (error) {
        res.status(500).json({ message: "Error submitting marks", error: error.message });
    }
};


export const createResult = async (req, res) => {
    try {
        const { sessionId, courseCode, marksObtained, professorEmail, hodEmail, academicCoordinatorEmail } = req.body;

        // Create a new Result instance
        const newResult = new Result({
            sessionId,
            courseCode,
            marksObtained,
            professorEmail,
            hodEmail,
            academicCoordinatorEmail,
        });

        // Save the result to the database
        const savedResult = await newResult.save();

        // Send a success response with the created result details
        res.status(201).json({
            message: "Result created successfully",
            result: savedResult,
        });
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(500).json({ message: "Error creating result", error: error.message });
    }
};

export const fetchSessionIdsByProfessor = async (req, res) => {
    try {
        const { professorEmail } = req.params; // Get the professor's email from the request parameters

        // Fetch exams created by the professor
        const exams = await Exam.find({ paperSetter: professorEmail });

        // If no exams are found, return a 404 response
        if (exams.length === 0) {
            return res.status(404).json({ message: "No exams found for the given professor." });
        }

        // Extract sessionIds from the exams
        const sessionIds = exams.map(exam => exam.sessionId);

        // Return the sessionIds in the response
        res.status(200).json({
            message: "Session IDs fetched successfully",
            sessionIds,
        });
    } catch (error) {
        // Handle any errors that occur during the request
        res.status(500).json({ message: "Error fetching session IDs", error: error.message });
    }
};


export const fetchSubmissionsBySessionId = async (req, res) => {
    try {
        const { sessionId } = req.params; // Get the sessionId from the route params

        // Fetch all submissions for the given sessionId
        const submissions = await Submission.find({ sessionId });

        // If no submissions found, return a 404 response
        if (submissions.length === 0) {
            return res.status(404).json({ message: "No submissions found for this session." });
        }

        // Return the submissions in the response
        res.status(200).json({
            message: "Submissions fetched successfully",
            submissions,
        });
    } catch (error) {
        // Handle any errors that occur during the request
        res.status(500).json({ message: "Error fetching submissions", error: error.message });
    }
};

// Controller function to create an exam
export const createExam = async (req, res) => {
    try {
        const {
            courseCode,
            paperSetter,
            questions,
            answerkey,
            studentsEnrolled,
            durationOfExam,
            description,
            startTime // Added startTime to the request body
        } = req.body;

        // Ensure startTime is provided and is a valid date
        if (!startTime || isNaN(new Date(startTime).getTime())) {
            return res.status(400).json({ message: "Invalid or missing start time." });
        }

        // Create a new Exam instance
        const newExam = new Exam({
            courseCode,
            paperSetter,
            questions,
            answerkey,
            studentsEnrolled,
            durationOfExam,
            description, // Optional field
            startTime: new Date(startTime), // Store start time as a Date object
        });

        // Save the exam to the database
        const savedExam = await newExam.save();

        // Send a success response with the created exam details
        res.status(201).json({
            message: "Exam created successfully",
            exam: savedExam, // Include the created exam details
        });
    } catch (error) {
        // Send an error response if something goes wrong
        res.status(500).json({ message: "Error creating exam", error: error.message });
    }
};
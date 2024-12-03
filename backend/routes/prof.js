import express from "express";
import { createExam, createResult, fetchSessionIdsByProfessor, fetchSubmissionsBySessionId, submitMarksOfOneStudent } from "../controllers/profControllers.js";
import { isProfessor } from "../middlewares/checkRole.js";

const router = express.Router();

// Route to fetch session IDs of exams created by a specific professor
router.get("/fetch-my-exams/:professorEmail", isProfessor, fetchSessionIdsByProfessor);

// Route to fetch submissions for a specific session ID
router.get("/fetch-submission-exams/:sessionId", isProfessor, fetchSubmissionsBySessionId);
// router.post("/create-result", createResult);
router.post("/create-exam", isProfessor, createExam)
router.post("/submit-marks/:studentEmail", isProfessor, submitMarksOfOneStudent);

export default router;

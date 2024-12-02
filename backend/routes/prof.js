import express from "express";
import { createResult, fetchSessionIdsByProfessor, fetchSubmissionsBySessionId, submitMarksOfOneStudent } from "../controllers/profControllers.js";
import { isProfessor } from "../middlewares/checkRole.js";

const router = express.Router();

// Route to fetch session IDs of exams created by a specific professor
router.get("/fetch-my-exams/:professorEmail", fetchSessionIdsByProfessor);

// Route to fetch submissions for a specific session ID
router.get("/fetch-submission-exams/:sessionId", fetchSubmissionsBySessionId);
// router.post("/create-result", createResult);
router.post("/submit-marks/:studentEmail", submitMarksOfOneStudent);

export default router;

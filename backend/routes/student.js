import express from "express";
import { fetchExam, submitExam, viewResult, submitComplaint, getStudentExamSessions } from "../controllers/studentControllers.js";
import { isStudent } from "../middlewares/checkRole.js";

const router = express.Router();

// Route to fetch exam details by courseCode
router.get("/fetch/:sessionId", isStudent, fetchExam);
router.post("/submit-exam", isStudent, submitExam);
router.post("/view-result/:sessionId", isStudent, viewResult);
router.post("/submit-complaint", isStudent, submitComplaint);
router.get("/:emailId", isStudent, getStudentExamSessions);

export default router;

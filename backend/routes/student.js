import express from "express";
import { fetchExam, submitExam, viewResult, submitComplaint, getStudentExamSessions } from "../controllers/studentControllers.js";
import { isStudent } from "../middlewares/checkRole.js";

const router = express.Router();

// Route to fetch exam details by courseCode
router.get("/fetch/:sessionId", fetchExam);
router.post("/submit-exam", submitExam);
router.get("/view-result/:sessionId", viewResult);
router.post("/submit-complaint", submitComplaint);
router.get("/:emailId", getStudentExamSessions);


export default router;

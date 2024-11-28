import express from "express";
import { fetchExam, submitExam, viewResult, submitComplaint } from "../controllers/studentControllers.js";
import { isStudent } from "../middlewares/checkRole.js";

const router = express.Router();

// Route to fetch exam details by courseCode
router.get("/fetch/:sessionId", isStudent, fetchExam);
router.post("/submit-exam", isStudent, submitExam);
router.get("/view-result/:sessionId", viewResult);
router.post("/submit-complaint", submitComplaint);


export default router;

import express from "express";
import { fetchAllApprovedResults, approveResult, updateExamStartTime, getUndefinedStartTime } from "../controllers/acadControllers.js";
import { isAcademicCoordinator } from "../middlewares/checkRole.js";
const router = express.Router();

// Route to fetch all approved results for the academic coordinator
router.get("/fetch-approved-results", isAcademicCoordinator, fetchAllApprovedResults);
router.put("/approve-result/:sessionId", isAcademicCoordinator, approveResult);
router.get("/undefined-start-time", isAcademicCoordinator, getUndefinedStartTime);
router.put("/set-start-time/:sessionId", isAcademicCoordinator, updateExamStartTime);


export default router;

import express from "express";
import { fetchAllApprovedResults, approveResult } from "../controllers/acadControllers.js";
import { isAcademicCoordinator } from "../middlewares/checkRole.js";
const router = express.Router();

// Route to fetch all approved results for the academic coordinator
router.get("/fetch-approved-results", isAcademicCoordinator, fetchAllApprovedResults);
router.put("/approve-result/:sessionId", isAcademicCoordinator, approveResult);

export default router;

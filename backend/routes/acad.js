import express from "express";
import { fetchAllApprovedResults, approveResult } from "../controllers/acadControllers.js";

const router = express.Router();

// Route to fetch all approved results for the academic coordinator
router.get("/fetch-approved-results", fetchAllApprovedResults);
router.put("/approve-result/:sessionId", approveResult);

export default router;

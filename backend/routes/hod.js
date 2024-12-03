import express from "express";
import { fetchUnresolvedComplaints, approveResultByHod, fetchResults, getApprovedResults } from "../controllers/hodControllers.js";
import { isHOD } from "../middlewares/checkRole.js";

const router = express.Router();

// Route to fetch unresolved complaints for HOD
router.get("/unresolved-complaints", isHOD, fetchUnresolvedComplaints);
router.post("/approve-result-hod", isHOD, approveResultByHod);
router.get("/fetch-unapproved-results/:hodEmail", isHOD, fetchResults);

router.get("/fetch-approved-result", isHOD, getApprovedResults);

export default router;

import express from "express";
import { fetchUnresolvedComplaints, approveResultByHod } from "../controllers/hodControllers.js";

const router = express.Router();

// Route to fetch unresolved complaints for HOD
router.get("/unresolved-complaints", fetchUnresolvedComplaints);
router.post("/approve-result-hod", approveResultByHod);

export default router;

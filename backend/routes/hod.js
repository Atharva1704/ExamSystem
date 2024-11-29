import express from "express";
import { fetchUnresolvedComplaints, approveResultByHod } from "../controllers/hodControllers.js";
import { isHOD } from "../middlewares/checkRole.js";

const router = express.Router();

// Route to fetch unresolved complaints for HOD
router.get("/unresolved-complaints", isHOD, fetchUnresolvedComplaints);
router.post("/approve-result-hod", isHOD, approveResultByHod);

export default router;

import express from "express";
import { fetchUnresolvedComplaints, approveResultByHod, fetchResults } from "../controllers/hodControllers.js";
import { isHOD } from "../middlewares/checkRole.js";

const router = express.Router();

// Route to fetch unresolved complaints for HOD
router.get("/unresolved-complaints", fetchUnresolvedComplaints);
router.post("/approve-result-hod", approveResultByHod);
router.get("/:hodEmail", fetchResults);

export default router;

import express from "express";
import { createExam } from "../controllers/profControllers.js";
import { isProfessor } from "../middlewares/checkRole.js";
const router = express.Router();

// Need to add isProf middleware
router.post("/create", isProfessor, createExam);

export default router;

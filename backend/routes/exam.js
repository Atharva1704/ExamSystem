import express from "express";
import { createExam } from "../controllers/profControllers.js";

const router = express.Router();

// Need to add isProf middleware
router.post("/create", createExam);

export default router;

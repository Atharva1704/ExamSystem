import express from "express";
import { login, registerUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/google/login", login);
// No longer used
// router.post("/register", registerUser);

export default router;
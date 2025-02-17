import express from "express";
import { registerUser, authUser } from "../controllers/userController.js";

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", authUser);

export default router;

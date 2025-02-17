// userRoutes.js
import express from "express";
import { registerUser, authUser, getUserProfile } from "../controllers/userController.js";  // Add getUserProfile here
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", authUser);

// Protected route for getting user profile
router.route("/profile").get(protect, getUserProfile);  // This should work now

export default router;

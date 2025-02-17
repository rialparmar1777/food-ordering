import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Example of a protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "This is a protected route.",
    user: req.user,
  });
});

export default router;

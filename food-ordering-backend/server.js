// server.js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Adjust according to your folder structure
import userRoutes from "./routes/userRoutes.js"; // Same here

dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

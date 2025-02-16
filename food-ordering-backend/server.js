require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB().then(() => {
  console.log("✅ MongoDB Connected Successfully");
}).catch((err) => {
  console.error("❌ MongoDB Connection Failed:", err);
  process.exit(1); // Exit if DB connection fails
});

// Routes
app.use("/api/users", userRoutes);

// Test Route
app.get("/api/test", (req, res) => {
  res.json({ message: "✅ Backend is working!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

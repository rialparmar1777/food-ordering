const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable Cross-Origin Resource Sharing

// Sample route
app.get("/", (req, res) => {
  res.send("Server is running!");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

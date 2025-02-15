const express = require("express");
const router = express.Router();

// Test Route
router.get("/", (req, res) => {
  res.json({ message: "User routes working!" });
});

module.exports = router;

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1]; // Extract token from header
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = await User.findById(decoded.id).select("-password"); // Attach user to request
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Not authorized, invalid token");
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  });

module.exports = { protect };
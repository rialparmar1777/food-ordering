// authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract token from the Authorization header
      token = req.headers.authorization.split(" ")[1];
      
      // Verify token and decode the user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user by id and attach to the request object
      req.user = await User.findById(decoded.id).select("-password");
      
      next(); // Proceed to the route handler
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export { protect };

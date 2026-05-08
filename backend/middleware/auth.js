
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  try {
    // Get token from headers (Authorization: Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);

    // Attach user to request
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ status: false, message: "Invalid or expired token" });
  }
};

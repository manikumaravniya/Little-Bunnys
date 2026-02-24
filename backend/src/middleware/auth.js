import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.admin = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

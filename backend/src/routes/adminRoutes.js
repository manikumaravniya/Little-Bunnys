import { Router } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }

  if (username !== env.adminUsername || password !== env.adminPassword) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  const token = jwt.sign({ username }, env.jwtSecret, { expiresIn: "24h" });

  return res.json({
    token,
    admin: { username },
  });
});

export default router;

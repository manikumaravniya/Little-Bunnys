import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://little-bunnys.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

app.use((error, _req, res, _next) => {
  if (error?.message?.includes("Only image uploads are allowed")) {
    return res.status(400).json({ message: error.message });
  }

  if (error?.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "Image size exceeds 5MB." });
  }

  return res.status(500).json({ message: "Server error." });
});

app.listen(env.port, () => {
  console.log(`Admin API running on http://localhost:${env.port}`);
});

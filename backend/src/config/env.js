import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const env = {
  port: Number(process.env.PORT || 5000),
  jwtSecret: process.env.JWT_SECRET || "change-this-jwt-secret",
  adminUsername: process.env.ADMIN_USERNAME || "admin",
  adminPassword: process.env.ADMIN_PASSWORD || "admin123",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "dlbjaesa9",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "717724687223266",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "Gek1tAPVIOkwpyqqzVCKwRkGBxM",
};

export const isCloudinaryConfigured =
  Boolean(env.cloudinaryCloudName) &&
  Boolean(env.cloudinaryApiKey) &&
  Boolean(env.cloudinaryApiSecret);

import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const env = {
  port: Number(process.env.PORT || 5000),
  jwtSecret: process.env.JWT_SECRET || "change-this-jwt-secret",
  adminUsername: process.env.ADMIN_USERNAME || "admin",
  adminPassword: process.env.ADMIN_PASSWORD || "admin123",
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "dlbjaesa9",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "717724687223266",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "Gek1tAPVIOkwpyqqzVCKwRkGBxM",
  postgresHost: process.env.POSTGRES_HOST || "localhost",
  postgresPort: Number(process.env.POSTGRES_PORT || 5432),
  postgresUser: process.env.POSTGRES_USER || "postgres",
  postgresPassword: process.env.POSTGRES_PASSWORD || "",
  postgresDatabase:
    process.env.POSTGRES_DB || process.env.POSTGRES_DATABASE || "littlebloomdb",
  postgresConnectionString: process.env.POSTGRES_URL || process.env.DATABASE_URL || "",
  postgresSsl: String(process.env.POSTGRES_SSL || "false").toLowerCase() === "true",
};

export const isCloudinaryConfigured =
  Boolean(env.cloudinaryCloudName) &&
  Boolean(env.cloudinaryApiKey) &&
  Boolean(env.cloudinaryApiSecret);

import { v2 as cloudinary } from "cloudinary";
import { env, isCloudinaryConfigured } from "./env.js";

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
  });
}

export const uploadImageBuffer = async (buffer, fileName) => {
  if (!isCloudinaryConfigured) {
    throw new Error("Cloudinary is not configured. Set CLOUDINARY_* variables.");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: process.env.CLOUDINARY_FOLDER || "little-bloom-products",
        public_id: fileName,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result?.secure_url) {
          reject(new Error("Cloudinary upload failed."));
          return;
        }

        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
};

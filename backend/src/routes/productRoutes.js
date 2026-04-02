import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { uploadImageBuffer } from "../config/cloudinary.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productStore.js";

const router = Router();

const validateCommon = ({ title, description, price }) => {
  if (!title?.trim()) {
    return "Title is required.";
  }

  if (!description?.trim()) {
    return "Description is required.";
  }

  if (price === undefined || price === null || price === "") {
    return "Price is required.";
  }

  const normalizedPrice = Number(price);
  if (Number.isNaN(normalizedPrice) || normalizedPrice < 0) {
    return "Price must be a valid positive number.";
  }

  return null;
};

router.get("/", async (_req, res) => {
  res.set("Cache-Control", "no-store");
  const products = await getProducts();
  return res.json(products);
});

router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const validationError = validateCommon({ title, description, price });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    if (!req.file?.buffer) {
      return res.status(400).json({ message: "Image is required." });
    }

    const imageUrl = await uploadImageBuffer(req.file.buffer, `product-${Date.now()}`);

    const created = await createProduct({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      imageUrl,
    });

    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to create product." });
  }
});

router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    const validationError = validateCommon({ title, description, price });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    let nextImageUrl = req.body.imageUrl;
    if (req.file?.buffer) {
      nextImageUrl = await uploadImageBuffer(req.file.buffer, `product-${Date.now()}`);
    }

    if (!nextImageUrl?.trim()) {
      return res.status(400).json({ message: "Product image is required." });
    }

    const updated = await updateProduct(req.params.id, {
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      imageUrl: nextImageUrl,
    });

    if (!updated) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: error.message || "Failed to update product." });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const deleted = await deleteProduct(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.status(204).send();
});

export default router;

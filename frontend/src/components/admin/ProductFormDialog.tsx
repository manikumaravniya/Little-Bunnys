import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Product } from "@/types/product";

type ProductFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  product?: Product | null;
  onSubmit: (values: {
    title: string;
    description: string;
    price: number;
    image: File | null;
    imageUrl?: string;
  }) => Promise<void>;
  isSubmitting?: boolean;
};

const ProductFormDialog = ({
  open,
  onOpenChange,
  mode,
  product,
  onSubmit,
  isSubmitting = false,
}: ProductFormDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setError("");
      return;
    }

    setTitle(product?.title || "");
    setDescription(product?.description || "");
    setPrice(product ? String(product.price) : "");
    setImageFile(null);
    setError("");
  }, [open, product]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!title.trim() || !description.trim() || !price.trim()) {
      setError("All fields are required.");
      return;
    }

    const parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      setError("Price must be a valid positive number.");
      return;
    }

    if (mode === "add" && !imageFile) {
      setError("Image is required for a new product.");
      return;
    }

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
      price: parsedPrice,
      image: imageFile,
      imageUrl: product?.imageUrl,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Product" : "Edit Product"}</DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Create a new product with title, description, price, and image."
              : "Update product details and optionally replace the image."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="product-title">Title</Label>
            <Input
              id="product-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter product title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-description">Description</Label>
            <Textarea
              id="product-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter product description"
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-price">Price</Label>
            <Input
              id="product-price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Enter product price"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product-image">
              {mode === "add" ? "Image Upload" : "Change Image (Optional)"}
            </Label>
            <Input
              id="product-image"
              type="file"
              accept="image/*"
              onChange={(event) => {
                setImageFile(event.target.files?.[0] || null);
              }}
            />
          </div>

          {error ? <p className="text-sm text-destructive">{error}</p> : null}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : mode === "add"
                  ? "Add Product"
                  : "Update Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { addToCart, getCartItems, removeFromCart, updateCartQuantity } from "@/lib/cart";
import { optimizeCloudinaryImageUrl } from "@/lib/cloudinary";
import { getStockStatusLabel, normalizeStockStatus, type StockStatus } from "@/lib/stock-status";

interface DressCardProps {
  imageUrl: string;
  code: string;
  title: string;
  description: string;
  price: number;
  stockStatus?: StockStatus | string | null;
}

const DressCard = ({ imageUrl, code, title, description, price, stockStatus }: DressCardProps) => {
  const [quantity, setQuantity] = useState(0);
  const normalizedStockStatus = normalizeStockStatus(stockStatus);
  const isInStock = normalizedStockStatus === "in_stock";
  const optimizedImageUrl = optimizeCloudinaryImageUrl(imageUrl, {
    width: 800,
    height: 1000,
    crop: "fill",
    gravity: "auto",
  });

  const syncQuantity = () => {
    const item = getCartItems().find((entry) => entry.code === code);
    setQuantity(item?.quantity || 0);
  };

  useEffect(() => {
    syncQuantity();
    const handler = () => syncQuantity();
    window.addEventListener("lb-cart-change", handler);
    return () => window.removeEventListener("lb-cart-change", handler);
  }, [code]);

  const handleAdd = () => {
    if (!isInStock) {
      return;
    }

    addToCart({ code, name: title, image: imageUrl });
  };

  const handleRemove = () => {
    if (quantity <= 1) {
      removeFromCart(code);
      return;
    }

    updateCartQuantity(code, quantity - 1);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-card card-hover">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img 
          src={optimizedImageUrl} 
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
              isInStock
                ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200"
                : "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200"
            }`}
          >
            {getStockStatusLabel(normalizedStockStatus)}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className="inline-block px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-foreground text-xs font-mono font-bold">
            {code}
          </span>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="h-16 overflow-hidden font-display text-xl font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
          <span className="whitespace-nowrap text-lg font-bold text-primary">
            ₹{price.toFixed(2)}
          </span>
        </div>
        <p className="h-[4.5rem] overflow-hidden text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-5">
          {quantity > 0 && (
            <Button variant="outline" onClick={handleRemove} className="h-11 w-11 shrink-0 px-0">
              -
            </Button>
          )}
          <Button className="h-11 flex-1 rounded-xl font-semibold" onClick={handleAdd} disabled={!isInStock}>
            {quantity > 0 ? `Added to cart (${quantity})` : isInStock ? "Add to cart" : "Out of stock"}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default DressCard;

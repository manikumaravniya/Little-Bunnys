export type StockStatus = "in_stock" | "out_of_stock";

export const normalizeStockStatus = (value?: string | null): StockStatus => {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase();

  if (["out of stock", "out_of_stock", "outofstock", "sold out", "unavailable", "not available", "out-of-stock"].includes(normalized)) {
    return "out_of_stock";
  }

  return "in_stock";
};

export const getStockStatusLabel = (value?: string | null) => {
  return normalizeStockStatus(value) === "out_of_stock" ? "Out of Stock" : "In Stock";
};

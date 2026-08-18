import { describe, expect, it } from "vitest";
import { normalizeStockStatus, getStockStatusLabel } from "@/lib/stock-status";

describe("stock status helpers", () => {
  it("normalizes common stock status values", () => {
    expect(normalizeStockStatus("in stock")).toBe("in_stock");
    expect(normalizeStockStatus("out of stock")).toBe("out_of_stock");
    expect(normalizeStockStatus("IN_STOCK")).toBe("in_stock");
    expect(normalizeStockStatus("sold out")).toBe("out_of_stock");
  });

  it("returns a readable label for the UI", () => {
    expect(getStockStatusLabel("in_stock")).toBe("In Stock");
    expect(getStockStatusLabel("out_of_stock")).toBe("Out of Stock");
  });
});

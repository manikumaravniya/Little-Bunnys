import type { StockStatus } from "@/lib/stock-status";

export type Product = {
  id: string;
  code: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  stockStatus: StockStatus;
};

export type ProductInput = {
  title: string;
  description: string;
  price: number;
  stockStatus?: StockStatus;
  image?: File | null;
  imageUrl?: string;
};

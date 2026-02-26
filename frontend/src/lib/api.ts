import { getAdminToken } from "@/lib/admin-auth";
import type { Product, ProductInput } from "@/types/product";

const configuredApiUrl = (import.meta.env.VITE_API_URL || "").trim().replace(/\/$/, "");
const API_BASE = import.meta.env.DEV || !configuredApiUrl
  ? "/api"
  : `${configuredApiUrl}/api`;
const BACKEND_HINT = "Backend API is not reachable. Start both apps with `npm run dev` (or `npm run dev:full`).";

const parseError = async (response: Response) => {
  try {
    const data = await response.json();
    return data?.message || "Request failed";
  } catch {
    if (response.status >= 500) {
      return BACKEND_HINT;
    }
    return "Request failed";
  }
};

const safeFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  try {
    return await fetch(input, init);
  } catch {
    throw new Error(BACKEND_HINT);
  }
};

export const adminLogin = async (username: string, password: string) => {
  const response = await safeFetch(`${API_BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<{ token: string; admin: { username: string } }>;
};

export const getProducts = async () => {
  const response = await safeFetch(`${API_BASE}/products`);
  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<Product[]>;
};

const authHeaders = () => {
  const token = getAdminToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  return { Authorization: `Bearer ${token}` };
};

export const createProduct = async (input: ProductInput) => {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("description", input.description);
  formData.append("price", String(input.price));

  if (!input.image) {
    throw new Error("Product image is required.");
  }

  formData.append("image", input.image);

  const response = await safeFetch(`${API_BASE}/products`, {
    method: "POST",
    headers: authHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<Product>;
};

export const updateProduct = async (productId: string, input: ProductInput) => {
  const formData = new FormData();
  formData.append("title", input.title);
  formData.append("description", input.description);
  formData.append("price", String(input.price));
  if (input.imageUrl) {
    formData.append("imageUrl", input.imageUrl);
  }
  if (input.image) {
    formData.append("image", input.image);
  }

  const response = await safeFetch(`${API_BASE}/products/${productId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json() as Promise<Product>;
};

export const deleteProduct = async (productId: string) => {
  const response = await safeFetch(`${API_BASE}/products/${productId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }
};

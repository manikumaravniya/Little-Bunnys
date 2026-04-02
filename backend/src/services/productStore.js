import { v4 as uuidv4 } from "uuid";
import { query } from "../config/db.js";
import { env } from "../config/env.js";

const mapRowToProduct = (row) => ({
  id: row.id,
  code: row.code,
  title: row.title,
  description: row.description,
  price: Number(row.price),
  imageUrl: row.image_url,
});

const PRODUCTS_CACHE_TTL_MS = Math.max(0, env.productCacheTtlMs || 0);

let cachedProducts = null;
let cachedProductsAt = 0;

const getFreshCachedProducts = () => {
  if (!cachedProducts) {
    return null;
  }

  if (PRODUCTS_CACHE_TTL_MS === 0) {
    return null;
  }

  if (Date.now() - cachedProductsAt > PRODUCTS_CACHE_TTL_MS) {
    return null;
  }

  return cachedProducts;
};

const setProductsCache = (products) => {
  cachedProducts = products;
  cachedProductsAt = Date.now();
};

export const invalidateProductsCache = () => {
  cachedProducts = null;
  cachedProductsAt = 0;
};

export const getProducts = async () => {
  const cached = getFreshCachedProducts();
  if (cached) {
    return cached;
  }

  const result = await query("SELECT * FROM dresses ORDER BY title ASC");
  const products = result.rows.map(mapRowToProduct);
  setProductsCache(products);

  return products;
};

export const createProduct = async (productInput) => {
  const nextCodeResult = await query(
    `
      SELECT
        COALESCE(MAX(NULLIF(regexp_replace(code, '\\D', '', 'g'), '')::int), 0) + 1 AS next_number
      FROM dresses
    `
  );

  const nextNumber = Number(nextCodeResult.rows[0]?.next_number || 1);
  const nextCode = `LB-${String(nextNumber).padStart(3, "0")}`;

  const product = {
    id: uuidv4(),
    code: nextCode,
    ...productInput,
  };

  const result = await query(
    `
      INSERT INTO dresses (id, code, title, description, price, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `,
    [
      product.id,
      product.code,
      product.title,
      product.description,
      product.price,
      product.imageUrl,
    ]
  );

  invalidateProductsCache();

  return mapRowToProduct(result.rows[0]);
};

export const updateProduct = async (id, productInput) => {
  const result = await query(
    `
      UPDATE dresses
      SET
        title = $2,
        description = $3,
        price = $4,
        image_url = $5
      WHERE id = $1
      RETURNING *
    `,
    [id, productInput.title, productInput.description, productInput.price, productInput.imageUrl]
  );

  if (!result.rows.length) {
    return null;
  }

  invalidateProductsCache();

  return mapRowToProduct(result.rows[0]);
};

export const deleteProduct = async (id) => {
  const result = await query("DELETE FROM dresses WHERE id = $1", [id]);

  if (result.rowCount > 0) {
    invalidateProductsCache();
  }

  return result.rowCount > 0;
};

import { v4 as uuidv4 } from "uuid";
import { query } from "../config/db.js";

const mapRowToProduct = (row) => ({
  id: row.id,
  code: row.code,
  title: row.title,
  description: row.description,
  price: Number(row.price),
  imageUrl: row.image_url,
});

export const getProducts = async () => {
  const result = await query("SELECT * FROM dresses ORDER BY title ASC");
  return result.rows.map(mapRowToProduct);
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

  return mapRowToProduct(result.rows[0]);
};

export const deleteProduct = async (id) => {
  const result = await query("DELETE FROM dresses WHERE id = $1", [id]);
  return result.rowCount > 0;
};

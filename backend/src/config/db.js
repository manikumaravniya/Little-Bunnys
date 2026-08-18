import { Pool } from "pg";
import { env } from "./env.js";

const sslConfig = env.postgresSsl ? { rejectUnauthorized: false } : false;

const poolConfig = env.postgresConnectionString
  ? {
      connectionString: env.postgresConnectionString,
      ssl: sslConfig,
    }
  : {
      host: env.postgresHost,
      port: env.postgresPort,
      user: env.postgresUser,
      password: env.postgresPassword,
      database: env.postgresDatabase,
      ssl: sslConfig,
    };

export const pool = new Pool(poolConfig);

export const query = (text, params = []) => pool.query(text, params);

export const ensureDressStockColumn = async () => {
  await query(`
    ALTER TABLE dresses
    ADD COLUMN IF NOT EXISTS stock_status VARCHAR(50) NOT NULL DEFAULT 'in_stock';
  `);

  await query(`
    UPDATE dresses
    SET stock_status = CASE
      WHEN lower(stock_status) IN ('out of stock', 'out_of_stock', 'outofstock', 'sold out', 'out-of-stock') THEN 'out_of_stock'
      ELSE 'in_stock'
    END
    WHERE stock_status IS NULL OR stock_status = '' OR lower(stock_status) IN ('in_stock', 'out_of_stock', 'outofstock', 'in stock', 'out of stock', 'sold out', 'out-of-stock');
  `);
};

export const testDbConnection = async () => {
  await query("SELECT 1");
};

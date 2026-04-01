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

export const testDbConnection = async () => {
  await query("SELECT 1");
};

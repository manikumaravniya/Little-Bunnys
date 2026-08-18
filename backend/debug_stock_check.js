import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT || 5432),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB || process.env.POSTGRES_DATABASE || 'postgres',
  ssl: String(process.env.POSTGRES_SSL || 'false').toLowerCase() === 'true' ? { rejectUnauthorized: false } : false,
});

const schema = await pool.query("SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name = 'dresses' ORDER BY ordinal_position;");
const constraints = await pool.query("SELECT conname, pg_get_constraintdef(oid) FROM pg_constraint WHERE conrelid = 'dresses'::regclass;");
console.log(JSON.stringify({ schema: schema.rows, constraints: constraints.rows }, null, 2));
await pool.end();

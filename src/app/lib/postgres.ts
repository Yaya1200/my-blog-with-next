import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PG_USERNAME as string,
  host: "localhost",
  database: process.env.PG_DATABASE as string,
  password: process.env.PG_PASSWORD as string,
  port: Number(process.env.PG_PORT), 
});

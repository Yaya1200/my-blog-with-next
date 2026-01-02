import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.PG_USERNAME as string,
  host: "localhost",
  database: process.env.PG_DATABASE as string,
  password: process.env.PG_PASSWORD as string,
  port: Number(process.env.PG_PORT), 
});
async function RunDb(){
  const client = await pool.connect();
  try{
    await client.query('CREATE TABLE IF NOT EXISTS my-blog (id SERIAL PRIMARY KEY, username TEXT NOT NULL,  password TEXT NOT NULL);');
  } finally{
    client.release();
  }

}
RunDb();

import pkg from "pg";
const { Pool } = pkg;
import bcrypt from 'bcrypt';

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
    await client.query('CREATE TABLE IF NOT EXISTS my_blog (id SERIAL PRIMARY KEY, username TEXT NOT NULL,  password TEXT NOT NULL);');
  } finally{
    client.release();
  }

}
RunDb();
type Input = {
  username: string,
  password: string
}

export async function StoreData({username, password}:Input){
  const userName = username;
  const passWord = password;
  const saltRounds = 10;
const result = await pool.query('SELECT username FROM my_blog WHERE username = ($1)', [userName]);
if(result.rows.length > 0){
 return {success: false, message: "The user already exits"};
}
else{
 const hasedpassword =  await bcrypt.hash(passWord, saltRounds)
await pool.query('INSERT INTO my_blog (username, password) VALUES ($1, $2)', [userName,  hasedpassword]);
     return {success:true, message: "The username and password are saved"}

}}
export async function GetData({ username, password }: Input) {
  const result = await pool.query(
    'SELECT password FROM my_blog WHERE username = $1',
    [username]
  );

  if (result.rows.length === 0) {
    return { success: false, message: "Unable to login please sign up" };
  }

  const hashedPassword = result.rows[0].password;
  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    return { success: false, message: "Incorrect password" };
  }

  return { success: true, message:"successfuly logedin" };
}





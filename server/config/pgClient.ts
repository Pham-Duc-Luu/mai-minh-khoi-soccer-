import { Pool } from 'pg'
 
const pool = new Pool({
  host: process.env.HOST,
  port: 5432,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
})

export default pool

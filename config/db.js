import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection helper
export const checkDbConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('🟢 MySQL Database connected successfully!');
    connection.release();
  } catch (error) {
    console.error('🔴 MySQL Database connection failed:', error.message);
  }
};

export default db;

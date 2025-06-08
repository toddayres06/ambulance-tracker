// Ensure .env is loaded
require('dotenv').config();  // Load environment variables

const { Client } = require('pg');

// Retrieve the database connection string from environment variables
const client = new Client({
  user: process.env.DB_USER,       // Database username from .env
  password: process.env.DB_PASSWORD, // Database password from .env
  host: process.env.DB_HOST,       // Database host from .env
  port: process.env.DB_PORT,       // Database port from .env
  database: process.env.DB_NAME,   // Database name from .env
  ssl: process.env.DB_SSL === 'true', // Ensure SSL connection is enabled
});

client.connect()
  .then(() => {
    console.log('✅ Connected successfully to Supabase DB');
    return client.query('SELECT NOW()');
  })
  .then(res => {
    console.log('🕒 Current time from DB:', res.rows[0]);
    return client.end();
  })
  .catch(err => {
    console.error('❌ Connection failed:', err.message);
  });

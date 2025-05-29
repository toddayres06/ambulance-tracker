process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:Mackship!@10@db.lmuxngwcygjqrqdjmfgf.supabase.co:5432/postgres?sslmode=require',
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

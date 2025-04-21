// Simple script to test database connection
require('dotenv').config();

console.log('Testing database connection...');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Exists (not showing for security)' : 'Missing');

// Extract host from DATABASE_URL without showing full credentials
const extractHostFromUrl = (url) => {
  try {
    if (!url) return 'No URL provided';
    const matches = url.match(/@([^:]+):/);
    return matches ? matches[1] : 'Could not extract host';
  } catch (error) {
    return 'Error extracting host';
  }
};

console.log('Database host:', extractHostFromUrl(process.env.DATABASE_URL));

// Test connection with pg
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect()
  .then(client => {
    console.log('Successfully connected to the database!');
    client.release();
    pool.end();
  })
  .catch(err => {
    console.error('Error connecting to the database:', err.message);
    pool.end();
  });

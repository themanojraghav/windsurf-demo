// Database connection verification script
require('dotenv').config();
const { Client } = require('pg');

// Extract and mask sensitive information for logging
function maskConnectionString(url) {
  if (!url) return 'URL is undefined';
  return url.replace(/\/\/([^:]+):([^@]+)@/, '//[USERNAME]:[PASSWORD]@');
}

console.log('Database URL (masked):', maskConnectionString(process.env.DATABASE_URL));

// Create a client with a 10 second timeout
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000 // 10 seconds timeout
});

// Test the connection
async function testConnection() {
  console.log('Attempting to connect to the database...');
  
  try {
    await client.connect();
    console.log('✅ Successfully connected to the database!');
    
    // Test a simple query
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Successfully executed query. Current database time:', result.rows[0].current_time);
    
    await client.end();
    console.log('Connection closed.');
  } catch (error) {
    console.error('❌ Error connecting to the database:');
    console.error(`Error name: ${error.name}`);
    console.error(`Error message: ${error.message}`);
    
    if (error.code) {
      console.error(`Error code: ${error.code}`);
      
      // Provide specific advice based on error codes
      if (error.code === 'ETIMEDOUT') {
        console.error('\nPossible causes:');
        console.error('1. The database is in sleep mode and needs to be activated');
        console.error('2. There might be network connectivity issues');
        console.error('3. The database hostname might be incorrect');
        console.error('\nSuggested actions:');
        console.error('- Check your Neon dashboard to ensure the database is active');
        console.error('- Verify your IP is not blocked by any firewall');
        console.error('- Confirm the database hostname is correct');
      } else if (error.code === 'ENOTFOUND') {
        console.error('\nThe database hostname could not be resolved.');
        console.error('Suggested action: Verify the hostname in your DATABASE_URL is correct');
      } else if (error.code === '28P01') {
        console.error('\nAuthentication failed. Incorrect username or password.');
        console.error('Suggested action: Check your credentials in the DATABASE_URL');
      } else if (error.code === '3D000') {
        console.error('\nDatabase does not exist.');
        console.error('Suggested action: Create the database or check the database name in your URL');
      }
    }
    
    try {
      await client.end();
    } catch (e) {
      // Ignore errors when ending the client
    }
  }
}

testConnection();

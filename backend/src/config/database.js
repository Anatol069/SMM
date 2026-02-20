const sql = require('mssql');

const config = {
  user: 'sa',
  password: '123456789',
  server: 'localhost',
  database: 'smm_database',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableKeepAlive: true,
    connectionTimeout: 30000,
    requestTimeout: 30000,
  },
};

let pool;

async function connectDB() {
  try {
    pool = new sql.ConnectionPool(config);
    await pool.connect();
    console.log('✅ Connected to SQL Server');
    return pool;
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
  }
}

function getPool() {
  if (!pool) {
    throw new Error(
      'Database not connected. Ensure SQL Server is running and credentials are correct.'
    );
  }
  return pool;
}

module.exports = { connectDB, getPool, sql };

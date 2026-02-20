const sql = require('mssql');

const config = {
    server: process.env.DB_SERVER || '(localdb)\\MSSQLLocalDB',
    database: process.env.DB_NAME || 'smm_database',
    authentication: {
        type: 'ntlm',
        options: {}
    },
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableKeepAlive: true,
        connectionTimeout: 30000,
        requestTimeout: 30000,
    }
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
        // Don't exit, allow server to run but warn about DB connection
        // process.exit(1);
    }
}

function getPool() {
    if (!pool) {
        throw new Error('Database not connected. Ensure SQL Server is running and credentials are correct.');
    }
    return pool;
}

module.exports = { connectDB, getPool, sql };

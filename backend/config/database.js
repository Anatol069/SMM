const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'YourPassword123',
    server: 'localhost',
    database: 'smm_database',
    authentication: { type: 'default' },
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};

let pool;

async function connectDB() {
    try {
        pool = new sql.ConnectionPool(config);
        await pool.connect();
        console.log('✅ Connected to SQL Server');
    } catch (err) {
        console.error('❌ DB Error:', err);
    }
}

module.exports = { connectDB, sql, pool };
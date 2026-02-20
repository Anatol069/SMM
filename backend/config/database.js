const sql = require('mssql');

const config = {
    user: 'sa',
    password: '123456789',
    server: 'localhost',
    database: 'smm_database',
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
        throw err;
    }
}

module.exports = { connectDB, sql, pool };
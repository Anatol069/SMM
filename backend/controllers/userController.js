const { pool, sql } = require('../config/database');
const bcrypt = require('bcrypt');

// Register User
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const request = pool.request();
        await request
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, hashedPassword)
            .query(`INSERT INTO Users (username, email, password) 
              VALUES (@username, @email, @password)`);

        res.json({ message: '✅ User created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const request = pool.request();
        const result = await request
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Users WHERE email = @email');

        if (result.recordset.length === 0) {
            return res.status(401).json({ error: 'User not found' });
        }

        const user = result.recordset[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        res.json({ message: '✅ Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
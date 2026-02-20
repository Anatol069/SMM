const { getPool, sql } = require('../config/database');

// Get all social accounts for user
const getAccounts = async (req, res) => {
    try {
        const pool = getPool();
        const result = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .query('SELECT * FROM SocialAccounts WHERE userId = @userId');

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get accounts', error: err.message });
    }
};

// Connect social account
const createAccount = async (req, res) => {
    try {
        const { platform, accountName, accessToken } = req.body;

        if (!platform || !accountName || !accessToken) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const pool = getPool();
        const result = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .input('platform', sql.NVarChar, platform)
            .input('accountName', sql.NVarChar, accountName)
            .input('accessToken', sql.NVarChar, accessToken)
            .query(`INSERT INTO SocialAccounts (userId, platform, accountName, accessToken)
              VALUES (@userId, @platform, @accountName, @accessToken);
              SELECT SCOPE_IDENTITY() as id`);

        const accountId = result.recordset[0].id;
        res.status(201).json({ message: '✅ Account connected', id: accountId });
    } catch (err) {
        res.status(500).json({ message: 'Failed to connect account', error: err.message });
    }
};

// Delete social account
const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();

        // Check ownership
        const checkResult = await pool.request()
            .input('id', sql.Int, id)
            .input('userId', sql.Int, req.user.id)
            .query('SELECT id FROM SocialAccounts WHERE id = @id AND userId = @userId');

        if (checkResult.recordset.length === 0) {
            return res.status(404).json({ message: 'Account not found' });
        }

        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM SocialAccounts WHERE id = @id');

        res.json({ message: '✅ Account deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete account', error: err.message });
    }
};

module.exports = { getAccounts, createAccount, deleteAccount };

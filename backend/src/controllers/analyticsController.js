const { getPool, sql } = require('../config/database');

// Get analytics
const getAnalytics = async (req, res) => {
    try {
        const pool = getPool();
        const result = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .query(`SELECT 
                COUNT(p.id) as totalPosts,
                SUM(p.likes) as totalLikes,
                SUM(p.comments) as totalComments,
                SUM(p.shares) as totalShares,
                SUM(p.views) as totalViews
              FROM Posts p
              WHERE p.userId = @userId AND p.status = 'posted'`);

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get analytics', error: err.message });
    }
};

module.exports = { getAnalytics };

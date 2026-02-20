const { getPool, sql } = require('../config/database');

// Get all posts for user
const getPosts = async (req, res) => {
    try {
        const pool = getPool();
        const result = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .query(`SELECT * FROM Posts 
              WHERE userId = @userId 
              ORDER BY scheduledTime DESC`);

        res.json(result.recordset);
    } catch (err) {
        console.error('Get posts error:', err);
        res.status(500).json({ message: 'Failed to get posts', error: err.message });
    }
};

// Create post
const createPost = async (req, res) => {
    try {
        const { socialAccountId, content, scheduledTime } = req.body;

        if (!socialAccountId || !content || !scheduledTime) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const pool = getPool();
        const result = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .input('socialAccountId', sql.Int, socialAccountId)
            .input('content', sql.NVarChar, content)
            .input('scheduledTime', sql.DateTime, new Date(scheduledTime))
            .query(`INSERT INTO Posts (userId, socialAccountId, content, scheduledTime, status)
              VALUES (@userId, @socialAccountId, @content, @scheduledTime, 'scheduled');
              SELECT SCOPE_IDENTITY() as id`);

        const postId = result.recordset[0].id;
        res.status(201).json({ message: '✅ Post created', id: postId });
    } catch (err) {
        console.error('Create post error:', err);
        res.status(500).json({ message: 'Failed to create post', error: err.message });
    }
};

// Update post
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, scheduledTime, status } = req.body;

        const pool = getPool();

        // Check ownership
        const checkResult = await pool.request()
            .input('id', sql.Int, id)
            .input('userId', sql.Int, req.user.id)
            .query('SELECT id FROM Posts WHERE id = @id AND userId = @userId');

        if (checkResult.recordset.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await pool.request()
            .input('id', sql.Int, id)
            .input('content', sql.NVarChar, content)
            .input('scheduledTime', sql.DateTime, new Date(scheduledTime))
            .input('status', sql.NVarChar, status)
            .query(`UPDATE Posts 
              SET content = @content, scheduledTime = @scheduledTime, status = @status, updatedAt = GETDATE()
              WHERE id = @id`);

        res.json({ message: '✅ Post updated' });
    } catch (err) {
        console.error('Update post error:', err);
        res.status(500).json({ message: 'Failed to update post', error: err.message });
    }
};

// Delete post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();

        // Check ownership
        const checkResult = await pool.request()
            .input('id', sql.Int, id)
            .input('userId', sql.Int, req.user.id)
            .query('SELECT id FROM Posts WHERE id = @id AND userId = @userId');

        if (checkResult.recordset.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Posts WHERE id = @id');

        res.json({ message: '✅ Post deleted' });
    } catch (err) {
        console.error('Delete post error:', err);
        res.status(500).json({ message: 'Failed to delete post', error: err.message });
    }
};

module.exports = { getPosts, createPost, updatePost, deletePost };

const { getPool, sql } = require('../config/database');

// Get all media for user
const getMedia = async (req, res) => {
    try {
        const pool = getPool();
        const result = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .query('SELECT * FROM Media WHERE userId = @userId ORDER BY createdAt DESC');

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get media', error: err.message });
    }
};

// Create media
const createMedia = async (req, res) => {
    try {
        const { title, type, url, thumbnailUrl, size, duration, dimensions } = req.body;

        if (!title || !type || !url) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const pool = getPool();
        const result = await pool.request()
            .input('userId', sql.Int, req.user.id)
            .input('title', sql.NVarChar, title)
            .input('type', sql.NVarChar, type)
            .input('url', sql.NVarChar, url)
            .input('thumbnailUrl', sql.NVarChar, thumbnailUrl || null)
            .input('size', sql.Int, size || 0)
            .input('duration', sql.Int, duration || 0)
            .input('dimensions', sql.NVarChar, dimensions || null)
            .query(`INSERT INTO Media (userId, title, type, url, thumbnailUrl, size, duration, dimensions)
              VALUES (@userId, @title, @type, @url, @thumbnailUrl, @size, @duration, @dimensions);
              SELECT SCOPE_IDENTITY() as id`);

        const mediaId = result.recordset[0].id;
        res.status(201).json({ message: '✅ Media uploaded', id: mediaId });
    } catch (err) {
        res.status(500).json({ message: 'Failed to upload media', error: err.message });
    }
};

// Delete media
const deleteMedia = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();

        // Check ownership
        const checkResult = await pool.request()
            .input('id', sql.Int, id)
            .input('userId', sql.Int, req.user.id)
            .query('SELECT id FROM Media WHERE id = @id AND userId = @userId');

        if (checkResult.recordset.length === 0) {
            return res.status(404).json({ message: 'Media not found' });
        }

        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Media WHERE id = @id');

        res.json({ message: '✅ Media deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete media', error: err.message });
    }
};

module.exports = { getMedia, createMedia, deleteMedia };

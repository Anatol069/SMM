const { getPool, sql } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const pool = getPool();

        // Check if email exists
        const checkResult = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT id FROM Users WHERE email = @email');

        if (checkResult.recordset.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, hashedPassword)
            .query(`INSERT INTO Users (username, email, password) 
              VALUES (@username, @email, @password);
              SELECT SCOPE_IDENTITY() as id`);

        const userId = result.recordset[0].id;

        // Generate JWT
        const token = jwt.sign(
            { id: userId, email },
            process.env.JWT_SECRET || 'your_super_secret_key_change_this_in_production',
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: '✅ User created successfully',
            token,
            user: { id: userId, username, email }
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

// Login User
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password required' });
        }

        const pool = getPool();

        // Get user
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT id, username, email, password FROM Users WHERE email = @email');

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = result.recordset[0];

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'your_super_secret_key_change_this_in_production',
            { expiresIn: '7d' }
        );

        res.json({
            message: '✅ Login successful',
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

// Get profile
const getProfile = async (req, res) => {
    try {
        const pool = getPool();
        const result = await pool.request()
            .input('id', sql.Int, req.user.id)
            .query('SELECT id, username, email, profilePicture, bio FROM Users WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Get profile error:', err);
        res.status(500).json({ message: 'Failed to get profile', error: err.message });
    }
};

// Update profile
const updateProfile = async (req, res) => {
    try {
        const { username, bio } = req.body;
        const pool = getPool();

        await pool.request()
            .input('id', sql.Int, req.user.id)
            .input('username', sql.NVarChar, username)
            .input('bio', sql.NVarChar, bio)
            .query(`UPDATE Users SET username = @username, bio = @bio, updatedAt = GETDATE() 
              WHERE id = @id`);

        res.json({ message: '✅ Profile updated' });
    } catch (err) {
        console.error('Update profile error:', err);
        res.status(500).json({ message: 'Failed to update profile', error: err.message });
    }
};

module.exports = { register, login, getProfile, updateProfile };

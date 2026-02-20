const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectDB } = require('./config/database');

// Import routes
const authRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const mediaRoutes = require('./routes/media');
const socialAccountRoutes = require('./routes/socialAccounts');
const analyticsRoutes = require('./routes/analytics');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
(async () => {
  try {
    console.log('🔌 Connecting to SQL Server...');
    await connectDB();
    console.log('✅ SQL Server connected successfully!');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }
})();

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/social-accounts', socialAccountRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/users', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

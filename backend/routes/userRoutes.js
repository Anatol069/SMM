const express = require('express');
const cors = require('cors');
const { connectDB } = require('../config/database');
const userRoutes = require('../routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use('/api/users', userRoutes);

app.listen(5000, () => {
    console.log('✅ Backend running on http://localhost:5000');
});
// server/server.js

// 1. REQUIRE MODULES (once at the top)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// 2. REQUIRE MODELS
const Individual = require('./models/Individual');

// 3. INITIALIZE APP
const app = express();

// 4. SETUP MIDDLEWARE (in the correct order)
// Use the robust CORS policy first to handle preflight requests
app.use(cors({
  origin: 'https://elegant-sawine-e71317.netlify.app',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Then, use the JSON body parser
app.use(express.json());

// 5. DATABASE CONNECTION
if (!process.env.MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in the .env file.');
    process.exit(1);
}
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));


// 6. HELPER MIDDLEWARE (like your authentication check)
const checkAuth = (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization === 'supersecretadmintoken') {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// 7. DEFINE API ROUTES (each one defined only once)

// POST a new individual's details (Public)
app.post('/api/individuals', async (req, res) => {
    try {
        const newIndividual = new Individual(req.body);
        await newIndividual.save();
        res.status(201).json(newIndividual);
    } catch (error) {
        res.status(400).json({ message: 'Error saving details', error });
    }
});

// GET all individuals (Admin only)
app.get('/api/individuals', checkAuth, async (req, res) => {
    try {
        const individuals = await Individual.find().sort({ submittedAt: -1 });
        res.json(individuals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data' });
    }
});

// POST for Admin Login
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        res.json({
            success: true,
            message: 'Login successful!',
            token: 'supersecretadmintoken'
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
});

// DELETE route to clear ALL individuals (Admin only)
app.delete('/api/individuals/all', checkAuth, async (req, res) => {
    try {
        await Individual.deleteMany({});
        res.status(200).json({ message: 'All data cleared successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing data', error });
    }
});

// DELETE route for multiple selected individuals (Admin only)
app.delete('/api/individuals', checkAuth, async (req, res) => {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'No IDs provided for deletion.' });
    }
    try {
        await Individual.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: 'Selected individuals deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting selected data', error });
    }
});


// 8. START THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
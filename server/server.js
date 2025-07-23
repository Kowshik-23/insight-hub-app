// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const corsOptions = {
  origin: 'https://elegant-sawine-e71317.netlify.app/', // Your Netlify frontend URL
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// --- Database Connection ---
if (!process.env.MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in the .env file.');
    process.exit(1); // This stops the script with an error code.
}
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// --- API Routes ---
const Individual = require('./models/Individual');

// Middleware to protect admin routes (simplified for example)
const checkAuth = (req, res, next) => {
    // In a real app, you'd verify a JWT here
    const { authorization } = req.headers;
    if (authorization === 'supersecretadmintoken') { // Replace with real JWT logic
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

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
app.post('/api/individuals', async (req, res) => {
    // ... (this route stays the same)
});

// GET all individuals (Admin only)
app.get('/api/individuals', checkAuth, async (req, res) => {
    // ... (this route stays the same)
});


// --- ADD THIS NEW LOGIN ROUTE ---
app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;

    // Check against the secure environment variables
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        // Login successful
        res.json({
            success: true,
            message: 'Login successful!',
            token: 'supersecretadmintoken' // This is the token our dashboard expects
        });
    } else {
        // Login failed
        res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
});
// insight-hub/server/server.js

// ... (keep all your existing code)

// --- ADD THE TWO NEW DELETE ROUTES ---

// DELETE route to clear ALL individuals (Admin only)
app.delete('/api/individuals/all', checkAuth, async (req, res) => {
    try {
        await Individual.deleteMany({}); // An empty filter deletes everything
        res.status(200).json({ message: 'All data cleared successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing data', error });
    }
});


app.delete('/api/individuals', checkAuth, async (req, res) => {
    const { ids } = req.body; // Expect an array of IDs in the request body

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: 'No IDs provided for deletion.' });
    }

    try {
        await Individual.deleteMany({
            _id: { $in: ids } // Use the $in operator to delete all docs whose _id is in the array
        });
        res.status(200).json({ message: 'Selected individuals deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting selected data', error });
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
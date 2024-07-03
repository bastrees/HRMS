// backend/routes/hotels.js
const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// Route to get all hotels
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add other hotel-related routes as needed

module.exports = router;

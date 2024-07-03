const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// Get all hotels
router.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add a new hotel
router.post('/', async (req, res) => {
    const { name, description, image } = req.body;
    try {
        const newHotel = new Hotel({ name, description, image });
        await newHotel.save();
        res.json(newHotel);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Update a hotel
router.put('/:id', async (req, res) => {
    const { name, description, image } = req.body;
    try {
        let hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ msg: 'Hotel not found' });
        }
        hotel.name = name || hotel.name;
        hotel.description = description || hotel.description;
        hotel.image = image || hotel.image;
        await hotel.save();
        res.json(hotel);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete a hotel
router.delete('/:id', async (req, res) => {
    try {
        let hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ msg: 'Hotel not found' });
        }
        await Hotel.deleteOne({ _id: req.params.id });
        res.json({ msg: 'Hotel removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;

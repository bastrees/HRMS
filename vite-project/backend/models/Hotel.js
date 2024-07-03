// backend/models/Hotel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    // Add other hotel-related fields as necessary
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;

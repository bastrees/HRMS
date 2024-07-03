// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Use your local MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/myhotelDB'; // Replace 'yourDatabaseName' with your actual database name
const JWT_SECRET = 'your_jwt_secret';

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

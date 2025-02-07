require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/key', (req, res) => {
    res.json({ apiKey: process.env.apiKey });  // Fetching API Key from .env file
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

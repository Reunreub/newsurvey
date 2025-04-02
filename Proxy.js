const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Proxy route
app.post('/submit', async (req, res) => {
    try {
        const response = await axios.post(
            'https://script.google.com/macros/s/AKfycbyRa6wJCHg2VewNJBFxqmOCsU8Wwo9fJcT0_KK1Q7-5DXGPqwchMyWqUaZIiOuJG8s/exec',
            req.body
        );
        res.setHeader('Access-Control-Allow-Origin', '*'); // Explicitly set CORS header
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error:', error.message); // Log error for debugging
        res.status(error.response?.status || 500).send({ error: error.message });
    }
});

// Favicon route to avoid 404 error
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});

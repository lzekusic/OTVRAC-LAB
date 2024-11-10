const express = require('express');
const path = require('path');
const { fetchMusicians } = require('./database');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3001;

app.use(express.static(path.resolve(__dirname, './public')));

app.get('/fetchMusicians', async (req, res) => {
    try {
        const data = await fetchMusicians();
        res.json(data);
    } catch (error) {
        console.error('Error fetching musicians data:', error);
        res.status(500).json({ error: 'Failed to fetch musicians data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

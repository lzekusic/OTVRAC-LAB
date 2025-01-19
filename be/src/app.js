const express = require('express');
const path = require('path');
const { fetchMusicians } = require('./database');
const cors = require('cors');
const { transformMusicianDataToJson, convertToCSV } = require('./convert-functions');

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

app.get('/pjevaciCsv', async (req, res) => {
    try {
        const data = await fetchMusicians();
        const csvData = convertToCSV(data);
        res.json(csvData);
    } catch (error) {
        console.error('Error fetching musicians data:', error);
        res.status(500).json({ error: 'Failed to fetch musicians data' });
    }
});

app.get('/pjevaciJson', async (req, res) => {
    try {
        const data = await fetchMusicians();
        const csvData = transformMusicianDataToJson(data);
        res.json(csvData);
    } catch (error) {
        console.error('Error fetching musicians data:', error);
        res.status(500).json({ error: 'Failed to fetch musicians data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

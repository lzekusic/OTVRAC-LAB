const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, './public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src/views/index.html'));
});

app.get('/datatable', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src/views/datatable.html'));
});

app.listen(PORT, () => {
    console.log(`Client is running on http://localhost:${PORT}`);
});

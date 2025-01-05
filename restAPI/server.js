const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const fs = require('fs'); 
const path = require('path');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.redirect('/artists');
});

app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'musicians',
  password: 'Lozinka1',
  port: 5432,
});

// err za database connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

//za response wrapper
const createResponse = (status, message, statusCode, data = null) => ({
  status,
  message,
  statusCode,
  response: data,
});



// GET - svi pjevaci u kolekciji
app.get('/artists', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM artists');
    res.status(200).json(createResponse('success', 'Fetched all artists', 200, result.rows));
  } catch (err) {
    console.error(err);
    res.status(500).json(createResponse('error', 'Internal Server Error', 500));
  }
});

// GET - pojedini pjevac po ID
app.get('/artists/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM artists WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json(createResponse('error', 'Artist not found', 404));
    }
    res.status(200).json(createResponse('success', 'Fetched artist', 200, result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json(createResponse('error', 'Internal Server Error', 500));
  }
});

// GET - svi albumi pojedinog pjevaca po ID pjevaca
app.get('/artists/:id/albums', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM albums WHERE artist_id = $1', [id]);
    res.status(200).json(createResponse('success', 'Fetched albums by artist', 200, result.rows));
  } catch (err) {
    console.error(err);
    res.status(500).json(createResponse('error', 'Internal Server Error', 500));
  }
});

// GET - broj grammyja za pojedinog pjevaca po ID pjevaca
app.get('/artists/:id/grammys', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT num_of_grammys FROM artists WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json(createResponse('error', 'Artist not found', 404));
    }
    res.status(200).json(createResponse('success', 'Fetched Grammy awards count', 200, result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json(createResponse('error', 'Internal Server Error', 500));
  }
});

// GET - broj albuma za pjevaca po ID pjevaca
app.get('/artists/:id/album-count', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT num_of_albums FROM artists WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json(createResponse('error', 'Artist not found', 404));
    }
    res.status(200).json(createResponse('success', 'Fetched album count', 200, result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json(createResponse('error', 'Internal Server Error', 500));
  }
});

// POST - dodaj novog pjevaca
app.post('/artists', async (req, res) => {
  const { first_name, last_name, dob, genre_id, country_of_birth, num_of_albums, label_id, num_of_grammys, albums_sold } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO artists (first_name, last_name, dob, genre_id, country_of_birth, num_of_albums, label_id, num_of_grammys, albums_sold)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [first_name, last_name, dob, genre_id, country_of_birth, num_of_albums, label_id, num_of_grammys, albums_sold]
    );
    res.status(201).json(createResponse('success', 'Artist created', 201, result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json(createResponse('error', 'Internal Server Error', 500));
  }
});

// POST - novi album za pojedinog pjevaca po ID pjevaca
app.post('/artists/:id/albums', async (req, res) => {
  const { id } = req.params;
  const { album_title, release_date, genre_id, label_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO albums (artist_id, album_title, release_date, genre_id, label_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id, album_title, release_date, genre_id, label_id]
    );
    res.status(201).json(createResponse('success', 'Album created', 201, result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json(createResponse('error', 'Internal Server Error', 500));
  }
});

// PUT - update pjevaca
app.put('/artists/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, dob, genre_id, country_of_birth, num_of_albums, label_id, num_of_grammys, albums_sold } = req.body;
  try {
    const result = await pool.query(
      `UPDATE artists SET first_name = $1, last_name = $2, dob = $3, genre_id = $4, country_of_birth = $5, num_of_albums = $6, label_id = $7, num_of_grammys = $8, albums_sold = $9 WHERE id = $10 RETURNING *`,
      [first_name, last_name, dob, genre_id, country_of_birth, num_of_albums, label_id, num_of_grammys, albums_sold, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json(createResponse('error', 'Artist not found', 404));
    }
    res.status(200).json(createResponse('success', 'Artist updated', 200, result.rows[0]));
  } catch (err) {
    console.error(err);
    res.status(500).json(createResponse('error', 'Internal Server Error', 500));
  }
});

// DELETE - izbrisi pjevaca
app.delete('/artists/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM artists WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json(createResponse('error', 'Artist not found', 404));
    }
    res.status(200).json(createResponse('success', 'Artist deleted successfully', 200));
  } catch (err) {
    console.error(err);
    res.status(500).json(createResponse('error', 'Internal Server Error', 500));
  }
});

// GET - API specifikaicja
app.get('/api-docs', (req, res) => {
  const openApiSpecPath = path.join(__dirname, 'openapi.json');
  try {
    const openApiSpec = fs.readFileSync(openApiSpecPath, 'utf8');
    res.status(200).json(JSON.parse(openApiSpec));
  } catch (err) {
    console.error(err);
    res.status(500).json(createResponse('error', 'Failed to load OpenAPI specification', 500));
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const { Pool } = require('pg');

const poolConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'musicians',
    password: 'Lozinka1',
    port: 5432,
};

const pool = new Pool(poolConfig);

const formatDate = (date) => date ? new Date(date).toISOString().split('T')[0] : "NULL";

async function fetchMusicians() {
    const query = `
        SELECT 
            a.first_name AS ime_pjevaca, 
            a.last_name AS prezime_pjevaca, 
            a.DOB AS datum_rodenja, 
            g.genre_name AS zanr, 
            a.country_of_birth AS drzava_rodenja, 
            a.num_of_albums AS broj_albuma_pjevaca, 
            l.label_name AS diskografska_kuca, 
            a.num_of_grammys AS broj_grammy_nagrada, 
            a.albums_sold AS broj_prodanih_albuma, 
            al.album_title AS naziv_albuma, 
            al.release_date AS datum_izdanja_albuma, 
            g2.genre_name AS zanr_albuma
        FROM Artists AS a
        JOIN Albums AS al ON a.id = al.artist_id
        JOIN Genres AS g ON a.genre_id = g.id
        JOIN Genres AS g2 ON al.genre_id = g2.id
        JOIN Labels AS l ON a.label_id = l.id;
    `;

    try {
        const { rows } = await pool.query(query);
        return rows.map(({ ime_pjevaca, prezime_pjevaca, datum_rodenja, zanr, drzava_rodenja, 
                           broj_albuma_pjevaca, diskografska_kuca, broj_grammy_nagrada, 
                           broj_prodanih_albuma, naziv_albuma, datum_izdanja_albuma, zanr_albuma }) => [
            ime_pjevaca,
            prezime_pjevaca,
            formatDate(datum_rodenja),
            zanr,
            drzava_rodenja,
            broj_albuma_pjevaca,
            diskografska_kuca,
            broj_grammy_nagrada,
            broj_prodanih_albuma,
            naziv_albuma,
            formatDate(datum_izdanja_albuma),
            zanr_albuma
        ]);

    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
}

module.exports = { fetchMusicians };

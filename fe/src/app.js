const express = require('express');
const path = require('path');
const { auth, requiresAuth } = require('express-openid-connect');
const { updateFiles } = require('./library');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'supersecret',
    baseURL: 'http://localhost:3000',
    clientID: 'EMGf2beouewcTsTeTxAVIMxSzGzWz5fR',
    issuerBaseURL: 'https://dev-nkrjtac7h4zfze88.us.auth0.com',
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(auth(config));
app.use(express.static(path.resolve(__dirname, './public')));

// RUTE:
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src/views/index.html'));
});

app.get('/datatable', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../src/views/datatable.html'));
});

// RUTE ZA CSV I JSON:
app.get('/pjevaci.csv', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pjevaci.csv'));
});

app.get('/pjevaci.json', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pjevaci.json'));
});

// AUTH RUTE:
app.get('/login', (req, res) => {
    res.oidc.login();
});

app.get('/logout', (req, res) => {
    res.oidc.logout();
});

app.get('/auth-status', (req, res) => {
    res.json({ isAuthenticated: req.oidc?.isAuthenticated() });
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(`
        <h1>Korisni\u010dki profil</h1>
        <pre>${JSON.stringify(req.oidc.user, null, 2)}</pre>
        <p><a href="/logout">Odjava</a></p>
    `);
});

app.get('/refresh', requiresAuth(), async (req, res) => {
    try {
        await updateFiles();
        res.send('Preslike su osvje\u017eene! <a href="/">Natrag na home</a>');
    } catch (error) {
        console.error("Error fetching data and updating files:", error);
        res.status(500).send({ error: "Failed to fetch and update files." });
    }
});

app.listen(PORT, () => {
    console.log(`Client is running on http://localhost:${PORT}`);
});
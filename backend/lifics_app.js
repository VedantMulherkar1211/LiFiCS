// Backend/lifics_app.js

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('../Backend/Route/lifics.route');

app.use(cors());
app.use(express.json());

app.use('/api', routes); // All routes start with /api

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

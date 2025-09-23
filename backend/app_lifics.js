// app_lifics.js
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const config = require('./services/config');
const { pool } = require('./services/db.service');

const app = express();
const PORT = config.PORT || 4000;

// -------------------- MIDDLEWARES --------------------
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// -------------------- DATABASE CONNECTION CHECK --------------------
pool.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL Pool connection failed:', err);
  } else {
    console.log('MySQL Pool connected successfully');
    connection.release();
  }
});

// -------------------- LOAD ALL CONTROLLERS --------------------
const controllersPath = path.join(__dirname, 'controller');

if (fs.existsSync(controllersPath)) {
  fs.readdirSync(controllersPath).forEach((file) => {
    if (file.endsWith('.js')) {
      const controller = require(path.join(controllersPath, file));

      // If controller is a function, call it with app
      if (typeof controller === 'function') {
        controller(app);
      }

      console.log(`Loaded controller: ${file}`);
    }
  });
} else {
  console.error(`Controllers folder not found: ${controllersPath}`);
}

// -------------------- DEFAULT ROUTE --------------------
app.get('/', (req, res) => {
  res.send('LiFiCS Backend is running');
});

// -------------------- ERROR HANDLING --------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('All controllers are now active');
});

module.exports = app;

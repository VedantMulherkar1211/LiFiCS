require('dotenv').config(); // Load .env
const mysql = require('mysql2');
const NodeCache = require('node-cache');

const PORT = process.env.PORT || 4000;

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// Create a NodeCache instance
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

module.exports = {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  myCache,
  mysql
};

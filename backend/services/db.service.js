const config = require('./config');

// Create MySQL connection pool
const pool = config.mysql.createPool({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  timezone: '+05:30', // IST
  multipleStatements: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Optional: single connection
const db = config.mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  timezone: '+05:30',
  multipleStatements: true
});

// Test pool connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL Pool connection failed:', err);
  } else {
    console.log('MySQL Pool connected successfully');
    connection.release();
  }
});

module.exports = { pool, db };

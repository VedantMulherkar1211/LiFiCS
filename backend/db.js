const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',       // use your actual MySQL/phpMyAdmin username
  password: '',       // use your MySQL/phpMyAdmin password, often blank in XAMPP/WAMP
  database: 'LiFiCS',
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
    return;
  }
  console.log('✅ MySQL connected successfully.');
});

module.exports = connection;

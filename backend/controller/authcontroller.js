// backend/controller/authcontroller.js
const { pool } = require('../services/db.service');

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: 'Email and password are required' });
  }

  const sql = 'SELECT user_id, username, email FROM mst_tblusers WHERE email = ? AND User_password = ?';
  pool.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Login error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (results.length === 0) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    const user = results[0];
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.user_id,
        name: user.username,
        email: user.email
      }
    });
  });
};

const db = require('../db');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: 'Email and password are required' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT * FROM Mst_tblusers WHERE email = ? AND User_password = ?',
      [email, password]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: 'Invalid email or password' });
    }

    const user = rows[0];

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

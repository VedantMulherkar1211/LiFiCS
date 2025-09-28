const { pool } = require('../services/db.service');

module.exports = (app) => {
  // Get all categories
  app.get('/api/finance/categories', (req, res) => {
    pool.query("SELECT exp_catg_id, exp_catg_name FROM tblexp_Category", (err, result) => {
      if (err) {
        console.error("Error fetching categories:", err);
        return res.status(500).json({ error: "Failed to fetch categories" });
      }
      res.json(result);
    });
  });

  // Add an expense
  app.post('/api/finance/addExpense', (req, res) => {
    const { user_id, exp_catg_id, amount, expense_date, notes } = req.body;

    if (!user_id || !exp_catg_id || !amount || !expense_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `
      INSERT INTO tblfin_Expenses (user_id, exp_catg_id, amount, expense_date, notes)
      VALUES (?, ?, ?, ?, ?)
    `;

    pool.query(sql, [user_id, exp_catg_id, amount, expense_date, notes || null], (err, result) => {
      if (err) {
        console.error("Error inserting expense:", err);
        return res.status(500).json({ error: "Failed to save expense" });
      }
      res.json({ message: "Expense added successfully", expense_id: result.insertId });
    });
  });

  // Get all expenses
  app.get('/api/finance/expenses', (req, res) => {
    const sql = `
      SELECT e.expense_id, e.amount, e.expense_date, e.notes,
             c.exp_catg_name, u.username
      FROM tblfin_Expenses e
      JOIN tblexp_Category c ON e.exp_catg_id = c.exp_catg_id
      JOIN mst_tblusers u ON e.user_id = u.user_id
      ORDER BY e.expense_date DESC
    `;

    pool.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching expenses:", err);
        return res.status(500).json({ error: "Failed to fetch expenses" });
      }
      res.json(result);
    });
  });
};

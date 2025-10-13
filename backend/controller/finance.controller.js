// backend/controller/expense.controller.js
import db from "../services/db.js";

export const get_tblfinexpense = async (req, res) => {
  try {
    const { year, limit, offset } = req.query;

    const p_year = year || new Date().getFullYear();
    const p_limit = parseInt(limit) || 100;
    const p_offset = parseInt(offset) || 0;

    const [rows] = await db.query(
      "CALL Usp_GetFinanceReport(?, ?, ?)",
      [p_year, p_limit, p_offset]
    );

    const result = rows[0];

    res.json({
      success: true,
      year: p_year,
      data: result
    });
  } catch (err) {
    console.error("Error fetching finance report:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


//Add new category

export const post_addCategory = async (req, res) => {
  let { exp_catg_name } = req.body;

  if (!exp_catg_name) {
    return res.status(400).json({ success: false, message: "Category name required" });
  }

  // Allow both single string and array
  if (!Array.isArray(exp_catg_name)) {
    exp_catg_name = [exp_catg_name];
  }

  try {
    for (const cat of exp_catg_name) {
      if (cat && cat.trim() !== "") {
        await db.query(
          "INSERT IGNORE INTO tblexp_Category (exp_catg_name) VALUES (?)",
          [cat.trim()]
        );
      }
    }
    res.json({ success: true, message: "Category(ies) added successfully" });
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({ success: false, message: "Error adding category" });
  }
};


export const addExpense = async (req, res) => {
  const { user_id, expenses, expense_date, notes } = req.body;

  if (!user_id || !expense_date || !expenses || expenses.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid input data" });
  }

  try {
    for (const exp of expenses) {
      if (!exp.Category || !exp.Amount) continue;

      await db.query("CALL AddExpense(?, ?, ?, ?, ?)", [
        user_id,
        exp.Category,
        exp.Amount,
        expense_date,
        notes || null,
      ]);
    }

    res.json({ success: true, message: "Expenses saved successfully!" });
  } catch (err) {
    console.error("Error saving expenses:", err);
    res.status(500).json({ success: false, message: "Database error" });
  }
};


// backend/controller/expense.controller.js
export const getExpensesByDate = async (req, res) => {
  const { date } = req.query;
  try {
    const [rows] = await db.query(
      `SELECT e.expense_id, c.exp_catg_name AS Category, e.amount 
       FROM tblfin_Expenses e
       JOIN tblexp_Category c ON e.exp_catg_id = c.exp_catg_id
       WHERE e.expense_date = ?`,
      [date]
    );

    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("Error fetching expenses by date:", err);
    res.status(500).json({ success: false, message: "Error fetching expenses" });
  }
};

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
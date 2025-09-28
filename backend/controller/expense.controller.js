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

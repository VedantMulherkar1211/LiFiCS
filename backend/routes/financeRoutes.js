// backend/routes/finance.routes.js
import express from "express";
import { get_tblfinexpense,post_addCategory,addExpense, getExpensesByDate } from "../controller/finance.controller";

const router = express.Router();

// Correct route: no extra /api
router.get("/expense-report", get_tblfinexpense);
router.post("/add-category", post_addCategory);
router.post("/add-expense", addExpense);
// backend/routes/finance.routes.js
router.get("/expenses-by-date", getExpensesByDate);

export default router;

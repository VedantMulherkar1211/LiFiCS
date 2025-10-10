// backend/routes/finance.routes.js
import express from "express";
import { get_tblfinexpense,post_addCategory,addExpense } from "../controller/expense.controller.js";

const router = express.Router();

// Correct route: no extra /api
router.get("/expense-report", get_tblfinexpense);
router.post("/add-category", post_addCategory);
router.post("/add-expense", addExpense);
export default router;

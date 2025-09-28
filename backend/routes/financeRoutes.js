// backend/routes/finance.routes.js
import express from "express";
import { get_tblfinexpense } from "../controller/expense.controller.js";

const router = express.Router();

// Correct route: no extra /api
router.get("/expense-report", get_tblfinexpense);

export default router;

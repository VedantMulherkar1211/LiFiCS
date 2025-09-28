const express = require("express");
const router = express.Router();
const financeController = require("../controller/finance.controller");

router.get("/categories", financeController.getCategories);
router.post("/addExpense", financeController.addExpense);
router.get("/expenses", financeController.getAllExpenses);

module.exports = router;

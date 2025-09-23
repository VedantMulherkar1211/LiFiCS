/**
 * @file finance.js
 * @description Finance Tracker Component (React)
 * @author Vedant
 * @version 2.0.0
 */

import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../component/ThemeContext";
import flatpickr from "flatpickr";
import TopNav from "../component/Topbar";
import SideNav from "../component/Sidebar";
import "flatpickr/dist/flatpickr.min.css";
import "../css/dashboard.css";

const Finance = () => {
  const { isDark } = useContext(ThemeContext);

  // 🔹 State management
  const [selectedDate, setSelectedDate] = useState("");
  const [expenseData, setExpenseData] = useState({});
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [allExpenses, setAllExpenses] = useState([]);

  // 🔹 Initialize Datepicker
  useEffect(() => {
    flatpickr("#datePicker", {
      dateFormat: "Y-m-d",
      defaultDate: new Date(),
      onChange: (selectedDates, dateStr) => {
        setSelectedDate(dateStr);
      },
    });
  }, []);

  // 🔹 Fetch categories from backend
  useEffect(() => {
    fetch("http://localhost:4000/api/finance/categories")
      .then((res) => res.json())
      .then((data) => setExpenseCategories(data))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  // 🔹 Fetch all expenses from backend
  const fetchExpenses = () => {
    fetch("http://localhost:4000/api/finance/expenses")
      .then((res) => res.json())
      .then((data) => setAllExpenses(data))
      .catch((err) => console.error("Error loading expenses:", err));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // 🔹 Handle input change
  const handleChange = (categoryId, value) => {
    setExpenseData((prev) => ({
      ...prev,
      [categoryId]: value,
    }));
  };

  // 🔹 Submit expenses
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    for (const [catId, value] of Object.entries(expenseData)) {
      if (value && parseFloat(value) > 0) {
        try {
          await fetch("http://localhost:4000/api/finance/addExpense", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: 1, // 🔹 Replace with logged-in user ID later
              exp_catg_id: catId,
              amount: parseFloat(value),
              expense_date: selectedDate,
              notes: null,
            }),
          });
        } catch (err) {
          console.error("Error saving expense:", err);
        }
      }
    }

    // Reset state
    setExpenseData({});
    setShowExpenseForm(false);
    document.getElementById("expenseModalClose").click();
    fetchExpenses();
  };

  return (
    <div className={`dashboard ${isDark ? "dark-mode" : ""}`}>
      <TopNav />
      <div className="dashboard-container">
        <SideNav />
        <div className="dashboard-content">
          <h2>Finance Tracker</h2>

          {/* 🔹 Date Picker */}
          <div className="mb-3">
            <input
              type="text"
              id="datePicker"
              className="form-control"
              placeholder="Select Date"
            />
          </div>

          {/* 🔹 Open Expense Form */}
          <button
            className="btn btn-primary"
            onClick={() => setShowExpenseForm(true)}
          >
            Add Expenses
          </button>

          {/* 🔹 Expense Form Modal */}
          {showExpenseForm && (
            <div className="modal fade show d-block" tabIndex="-1">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Expenses</h5>
                    <button
                      type="button"
                      id="expenseModalClose"
                      className="btn-close"
                      onClick={() => setShowExpenseForm(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        {expenseCategories.map((cat) => (
                          <div className="col-md-6 mb-3" key={cat.exp_catg_id}>
                            <label>{cat.exp_catg_name}</label>
                            <input
                              type="number"
                              className="form-control"
                              value={expenseData[cat.exp_catg_id] || ""}
                              onChange={(e) =>
                                handleChange(cat.exp_catg_id, e.target.value)
                              }
                            />
                          </div>
                        ))}
                      </div>
                      <button type="submit" className="btn btn-success mt-3">
                        Save Expenses
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 🔹 Display Expenses */}
          <div className="mt-5">
            <h4>All Expenses</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Notes</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {allExpenses.length > 0 ? (
                  allExpenses.map((exp) => (
                    <tr key={exp.expense_id}>
                      <td>{exp.expense_date}</td>
                      <td>{exp.exp_catg_name}</td>
                      <td>{exp.amount}</td>
                      <td>{exp.notes || "-"}</td>
                      <td>{exp.username}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No expenses recorded
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;

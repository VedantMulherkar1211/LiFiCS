import React, { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../component/ThemeContext";
import flatpickr from "flatpickr";
import TopNav from "../component/Topbar";
import SideNav from "../component/Sidebar";
import "flatpickr/dist/flatpickr.min.css";
import "../css/dashboard.css";

const Finance = () => {
  const { isDark } = useContext(ThemeContext);

  const contentStyle = {
    background: isDark
      ? "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25), transparent 40%), radial-gradient(circle at 70% 70%, rgba(59,130,246,0.25), transparent 40%), #0f172a"
      : "#ffffff",
    color: isDark ? "#ffffff" : "#000000",
    minHeight: "100vh",
    padding: "20px",
    transition: "all 0.5s ease",
  };

  const tableStyle = {
    backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "#ffffff",
    color: isDark ? "#ffffff" : "#000000",
    border: isDark ? "2px solid #FFFF00" : "1px solid #dee2e6",
    transition: "all 0.5s ease",
    
  };

  const months = [
    "Jan","Feb","March","April","May","June","July","Aug","Sep","Oct","Nov","Dec"
  ];

  const expenseCategories = [
    "Gym","Classes","Rent","Breakfast","Lunch","Snacks","Dinner","Tiffine Total",
    "Groceries","Shoping","Fruits","Travel","Fuel","Vechile","Electronics",
    "Travelling","Beverages","Cosmetics","Pharma","Recharge (mobile + Wifi)",
    "Fees (Exam + Courses)","Extra",
  ];

  const [selectedDate, setSelectedDate] = useState("");
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseData, setExpenseData] = useState({});
  const [allExpenses, setAllExpenses] = useState({});
  const datePickerRef = useRef(null);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) setAllExpenses(JSON.parse(saved));
  }, []);

  // Setup date picker
  useEffect(() => {
    if (datePickerRef.current) {
      flatpickr(datePickerRef.current, {
        enableTime: false,
        dateFormat: "Y-m-d",
        allowInput: true,
        maxDate: "today",
        onChange: (selectedDates, dateStr) => {
          setSelectedDate(dateStr);
          setShowExpenseForm(true);
        },
      });
    }
  }, []);

  const handleExpenseChange = (e, category) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setExpenseData((prev) => ({ ...prev, [category]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate) return;

    const monthIdx = new Date(selectedDate).getMonth();
    const monthName = months[monthIdx];

    // Clone current data
    let updated = { ...allExpenses };

    // Initialize if not exists
    if (!updated[monthName]) {
      updated[monthName] = {};
      expenseCategories.forEach((cat) => {
        updated[monthName][cat] = 0;
      });
    }

    // Add values
    Object.keys(expenseData).forEach((cat) => {
      const val = parseFloat(expenseData[cat] || 0);
      updated[monthName][cat] =
        (updated[monthName][cat] || 0) + (isNaN(val) ? 0 : val);
    });

    // Save in localStorage
    setAllExpenses(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));

    // Reset form + close modal
    setExpenseData({});
    setShowExpenseForm(false);
    document.getElementById("expenseModalClose").click();
  };

  // Calculate totals
  const getCategoryTotal = (category) => {
    return months.reduce((sum, m) => sum + (allExpenses[m]?.[category] || 0), 0);
  };

  const getMonthTotal = (month) => {
    return expenseCategories.reduce(
      (sum, cat) => sum + (allExpenses[month]?.[cat] || 0),
      0
    );
  };

  const getGrandTotal = () => {
    return months.reduce((sum, m) => sum + getMonthTotal(m), 0);
  };

  return (
    <div className="dashboard-container">
      <TopNav />
      <div className="dashboard-wrapper">
        <SideNav />
        <main className="dashboard-content" style={contentStyle}>
          <div className="card mb-4">
            <div className="card-header">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#expenseModal"
              >
                Add Expenses
              </button>
              <h2 className="card-title mt-2">Finance Data</h2>
            </div>

            {/* Expenses Table */}
            <div className="card-body table-responsive bg-dark" style={tableStyle}>
              <table className="table table-bordered table-striped text-center">
                <thead>
                  <tr>
                    <th className="bg-warning">Month</th>
                    {months.map((m) => (
                      <th className="bg-warning" key={m}>{m}</th>
                    ))}
                    <th className="bg-warning">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseCategories.map((cat) => (
                    <tr key={cat}>
                      <td className="text-start">{cat}</td>
                      {months.map((m) => (
                        <td key={m}>{allExpenses[m]?.[cat] || ""}</td>
                      ))}
                      <td className="fw-bold">{getCategoryTotal(cat)}</td>
                    </tr>
                  ))}
                  <tr className="table-secondary fw-bold">
                    <td>Total</td>
                    {months.map((m) => (
                      <td key={m}>{getMonthTotal(m)}</td>
                    ))}
                    <td>{getGrandTotal()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal */}
          <div
            className="modal fade"
            id="expenseModal"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Daily Expenses</h5>
                  <button
                    id="expenseModalClose"
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    {/* Date Picker */}
                    <fieldset className="border rounded p-3 mb-3">
                      <legend className="w-auto text-primary">Select Date</legend>
                      <input
                        ref={datePickerRef}
                        placeholder="YYYY-MM-DD"
                        className="form-control w-25"
                      />
                    </fieldset>

                    {/* Expenses */}
                    {showExpenseForm && (
                      <fieldset className="border rounded p-3 mb-3">
                        <legend className="w-auto text-success">
                          Enter Expenses
                        </legend>
                        <div className="row">
                          {expenseCategories.map((cat, idx) => (
                            <div key={idx} className="col-md-4 mb-3">
                              <label className="form-label">{cat}</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Amount (Rs.)"
                                value={expenseData[cat] || ""}
                                onChange={(e) => handleExpenseChange(e, cat)}
                              />
                            </div>
                          ))}
                        </div>
                      </fieldset>
                    )}

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary m-1">
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary m-1"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Finance;

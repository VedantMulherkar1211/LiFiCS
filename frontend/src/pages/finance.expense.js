import React, { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../component/ThemeContext";
import flatpickr from "flatpickr";
import TopNav from "../component/Topbar";
import SideNav from "../component/Sidebar";
import DataTable, { createTheme } from "react-data-table-component";
import "flatpickr/dist/flatpickr.min.css";
import "../css/dashboard.css";

// 🔹 Custom theme
createTheme("darkTable", {
  text: { primary: "#ffffff", secondary: "#cbd5e1" },
  background: { default: "#0f172a" },
  context: { background: "#1e293b", text: "#ffffff" },
  divider: { default: "#334155" },
  action: {
    button: "rgba(255, 255, 255, 0.54)",
    hover: "rgba(255, 255, 255, 0.08)",
    disabled: "rgba(255, 255, 255, 0.12)",
  },
});

const FinanceExpense = () => {
  const { isDark } = useContext(ThemeContext);

  // 🔹 States
  const [selectedDate, setSelectedDate] = useState("");
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenseData, setExpenseData] = useState({});
  const [allExpenses, setAllExpenses] = useState([]);
  const [extraExpenses, setExtraExpenses] = useState([]);
  const datePickerRef = useRef(null);

  // 🔹 Styles
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
    padding: "10px",
    borderRadius: "5px",
  };

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  // ========== FUNCTIONS ==========

  // 🔹 Fetch expenses from backend
  const fetchExpenses = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/finance/expense-report?year=2025&limit=100&offset=0"
      );
      const json = await res.json();
      if (json.success && json.data) {
        setAllExpenses(json.data);
      }
    } catch (err) {
      console.error("Error fetching finance data:", err);
    }
  };

  // 🔹 Setup Date Picker
  // const setupDatePicker = () => {
  //   if (datePickerRef.current) {
  //     flatpickr(datePickerRef.current, {
  //       enableTime: false,
  //       dateFormat: "Y-m-d",
  //       allowInput: true,
  //       maxDate: "today",
  //       onChange: (selectedDates, dateStr) => {
  //         setSelectedDate(dateStr);
  //         setShowExpenseForm(true);
  //       },
  //     });
  //   }
  // };
  const setupDatePicker = () => {
  if (datePickerRef.current) {
    flatpickr(datePickerRef.current, {
      enableTime: false,
      dateFormat: "Y-m-d",
      allowInput: true,
      maxDate: "today",
      onChange: (selectedDates, dateStr) => {
        setSelectedDate(dateStr);
        setShowExpenseForm(true);
        fetchExpensesByDate(dateStr); // 🔹 load existing values
      },
    });
  }
};


  // 🔹 Handle Expense Change
  const handleExpenseChange = (e, category) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setExpenseData((prev) => ({ ...prev, [category]: value }));
    }
  };

  // 🔹 Handle Extra Expense Change
  const handleExtraExpenseChange = (index, field, value) => {
    setExtraExpenses((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  // 🔹 Add More Expense Field
  const addMoreExpenseField = () => {
    setExtraExpenses((prev) => [...prev, { Category: "", Amount: "" }]);
  };

  // 🔹 Handle Form Submit
  const handleFormsubmit = async () => {
    if (!selectedDate) return;

    const payload = {
      user_id: 1, // 🔹 Get this dynamically if you have auth
      expense_date: selectedDate,
      notes: "Daily expenses entry",
      expenses: [
        ...Object.entries(expenseData).map(([Category, Amount]) => ({
          Category,
          Amount,
        })),
        ...extraExpenses.filter((e) => e.Category.trim() !== ""),
      ],
    };

    try {
      await fetch("http://localhost:5000/api/finance/add-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      alert("Expenses saved successfully!");
    } catch (err) {
      console.error("Error saving expenses:", err);
      alert("Error saving expenses. Check console.");
    }

    // Reset
    setExpenseData({});
    setExtraExpenses([]);
    setShowExpenseForm(false);
    document.getElementById("expenseModalClose").click();
  };

  // 🔹 Handle Category Submit
  const handleSubmit = async () => {
    if (!selectedDate) return;
    try {
      for (const extra of extraExpenses) {
        if (extra.Category.trim() !== "") {
          await fetch("http://localhost:5000/api/finance/add-category", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ exp_catg_name: extra.Category }),
          });
        }
      }
      alert("Expenses & categories saved successfully!");
    } catch (err) {
      console.error("Error saving expenses:", err);
      alert("Error saving expenses. Check console.");
    }

    setExpenseData({});
    setExtraExpenses([]);
    setShowExpenseForm(false);
    document.getElementById("expenseModalClose").click();
  };

  // 🔹 Helpers
  const getCategoryTotal = (row) => {
    return months.reduce((sum, m) => sum + parseFloat(row[m] || 0), 0);
  };

  const getGrandTotal = () => {
    return allExpenses.reduce((sum, row) => sum + getCategoryTotal(row), 0);
  };

  const getFormTotal = () => {
    let total = 0;
    for (const key in expenseData) {
      total += parseFloat(expenseData[key] || 0);
    }
    for (const extra of extraExpenses) {
      total += parseFloat(extra.Amount || 0);
    }
    return total;
  };

  //added
  const fetchExpensesByDate = async (dateStr) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/finance/expenses-by-date?date=${dateStr}`
    );
    const json = await res.json();
    if (json.success && json.data) {
      // Pre-fill form with existing amounts
      const existing = {};
      json.data.forEach((item) => {
        existing[item.Category] = item.amount;
      });
      setExpenseData(existing);
    }
  } catch (err) {
    console.error("Error fetching expenses by date:", err);
  }
};


  // 🔹 DataTable Config
  const columns = [
    { name: "Category", selector: (row) => row.Category, sortable: true },
    ...months.map((m) => ({
      name: m,
      selector: (row) => parseFloat(row[m] || 0),
      sortable: true,
      right: true,
    })),
    {
      name: "Total",
      selector: (row) => getCategoryTotal(row),
      sortable: true,
      right: true,
    },
  ];

  const data = allExpenses.map((row) => {
    const rowData = { ...row };
    months.forEach((m) => (rowData[m] = parseFloat(row[m] || 0)));
    rowData.total = getCategoryTotal(row);
    return rowData;
  });

  // ========== LIFECYCLE ==========
  useEffect(() => {
    fetchExpenses();
    setupDatePicker();
  }, []);

  

  // ========== JSX ==========
  return (
    <div className="dashboard-container">
      <TopNav />
      <div className="dashboard-wrapper">
        <SideNav />
        <main className="dashboard-content" style={contentStyle}>
          {/* Table */}
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

            <div className="card-body table-responsive bg-dark" style={tableStyle}>
              <DataTable
                columns={columns}
                data={data}
                highlightOnHover
                responsive
                fixedHeader
                pagination
                theme={isDark ? "darkTable" : "default"}
              />
              <div className="mt-2 fw-bold text-end">
                Grand Total: {getGrandTotal()}
              </div>
            </div>
          </div>

          {/* Modal */}
          <div className="modal fade" id="expenseModal" tabIndex="-1" aria-hidden="true">
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
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit();
                      handleFormsubmit();
                    }}
                  >
                    {/* Date */}
                    <fieldset className="border rounded p-3 mb-3">
                      <legend className="w-auto text-primary">Select Date</legend>
                      <input
                        ref={datePickerRef}
                        placeholder="YYYY-MM-DD"
                        className="form-control w-25"
                      />
                    </fieldset>

                    {showExpenseForm && (
                      <>
                        {/* Main Expenses */}
                        <fieldset className="border rounded p-3 mb-3">
                          <legend className="w-auto text-success">Enter Expenses</legend>
                          <div className="row">
                            {allExpenses
                              .filter((row) => row.Category !== "TOTAL")
                              .map((row, idx) => (
                                <div key={idx} className="col-md-4 mb-3">
                                  <label className="form-label">{row.Category}</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Amount (Rs.)"
                                    value={expenseData[row.Category] || ""}
                                    onChange={(e) => handleExpenseChange(e, row.Category)}
                                  />
                                </div>
                              ))}
                          </div>
                        </fieldset>

                        {/* Additional Expenses */}
                        <fieldset className="border rounded p-3 mb-3">
                          <legend className="w-auto text-info">Additional Expenses</legend>
                          {extraExpenses.map((extra, idx) => (
                            <div key={idx} className="row mb-2">
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Category"
                                  value={extra.Category}
                                  onChange={(e) =>
                                    handleExtraExpenseChange(idx, "Category", e.target.value)
                                  }
                                />
                              </div>
                              <div className="col-md-6">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Amount (Rs.)"
                                  value={extra.Amount}
                                  onChange={(e) =>
                                    handleExtraExpenseChange(idx, "Amount", e.target.value)
                                  }
                                />
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="btn btn-outline-primary mt-2"
                            onClick={addMoreExpenseField}
                          >
                            + Add More
                          </button>
                        </fieldset>

                        {/* ✅ Show Total */}
                        <div className="d-flex justify-content-end mt-3 fw-bold">
                          Total: {getFormTotal()} Rs.
                        </div>
                      </>
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

export default FinanceExpense;

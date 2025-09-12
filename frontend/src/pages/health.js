import React, { useState, useEffect, useContext, useRef } from "react";
import { ThemeContext } from "../component/ThemeContext";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import TopNav from "../component/Topbar";
import SideNav from "../component/Sidebar";
import "../css/dashboard.css";

const Health = () => {
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

  const initialFormData = {
    age: "",
    gender: "",
    height: "",
    weight: "",
    bmi: "",
    bloodpressure: "",
    bloodglucose: "",
    heartrate: "",
    hairDensity: "",
    hairLossRate: "",
    scalpCondition: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [allHealthData, setAllHealthData] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const datePickerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("healthData");
    if (saved) setAllHealthData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (datePickerRef.current) {
      flatpickr(datePickerRef.current, {
        enableTime: false,
        dateFormat: "Y-m-d",
        allowInput: true,
        onChange: (selectedDates, dateStr) => {
          setSelectedDate(dateStr);
        },
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate) return;

    const newEntry = {
      id: allHealthData.length + 1,
      date: selectedDate,
      ...formData,
    };

    const updated = [...allHealthData, newEntry];
    setAllHealthData(updated);
    localStorage.setItem("healthData", JSON.stringify(updated));

    setFormData(initialFormData);
    document.getElementById("healthFormModalClose").click();
  };

  const handleReset = () => {
    setFormData(initialFormData);
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
                data-bs-target="#healthFormModal"
              >
                Open Health Form
              </button>
              <h2 className="card-title mt-2">Health Data</h2>
            </div>
            <div className="card-body table-responsive bg-dark" style={tableStyle}>
              <table className="table table-bordered table-striped text-center finance-table">
                <thead>
                  <tr>
                    <th className="bg-warning">ID</th>
                    <th className="bg-warning">Date</th>
                    <th className="bg-warning">Age</th>
                    <th className="bg-warning">Gender</th>
                    <th className="bg-warning">Height (cm)</th>
                    <th className="bg-warning">Weight (kg)</th>
                    <th className="bg-warning">BMI</th>
                    <th className="bg-warning">Blood Pressure</th>
                    <th className="bg-warning">Blood Glucose</th>
                    <th className="bg-warning">Heart Rate</th>
                    <th className="bg-warning">Hair Density</th>
                    <th className="bg-warning">Hair Loss Rate</th>
                    <th className="bg-warning">Scalp Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {allHealthData.length > 0 ? (
                    allHealthData.map((entry) => (
                      <tr key={entry.id}>
                        <td>{entry.id}</td>
                        <td>{entry.date}</td>
                        <td>{entry.age}</td>
                        <td>{entry.gender}</td>
                        <td>{entry.height}</td>
                        <td>{entry.weight}</td>
                        <td>{entry.bmi}</td>
                        <td>{entry.bloodpressure}</td>
                        <td>{entry.bloodglucose}</td>
                        <td>{entry.heartrate}</td>
                        <td>{entry.hairDensity}</td>
                        <td>{entry.hairLossRate}</td>
                        <td>{entry.scalpCondition}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="13">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Form */}
          <div
            className="modal fade"
            id="healthFormModal"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Health Details Form</h5>
                  <button
                    id="healthFormModalClose"
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <fieldset className="border rounded p-3 mb-3">
                      <legend className="w-auto text-primary">Select Date</legend>
                      <input
                        ref={datePickerRef}
                        placeholder="YYYY-MM-DD"
                        className="form-control w-25"
                      />
                    </fieldset>

                    <fieldset className="border rounded p-3 mb-3">
                      <legend className="w-auto text-success">Enter Health Data</legend>
                      <div className="row">
                        {Object.keys(initialFormData).map((key, idx) => (
                          <div key={idx} className="col-md-4 mb-3">
                            <label className="form-label">{key}</label>
                            <input
                              type="text"
                              name={key}
                              className="form-control"
                              value={formData[key]}
                              onChange={handleChange}
                            />
                          </div>
                        ))}
                      </div>
                    </fieldset>

                    <div className="d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary m-1">
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary m-1"
                        onClick={handleReset}
                      >
                        Reset
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

export default Health;

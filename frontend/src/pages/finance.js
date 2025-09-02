import React, { useState, useEffect, useRef, useContext} from "react";
import { ThemeContext } from "../component/ThemeContext";
import flatpickr from "flatpickr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faBullseye, faDownload, faExpand } from "@fortawesome/free-solid-svg-icons";
import TopNav from "../component/Topbar";
import SideNav from "../component/Sidebar";
import "flatpickr/dist/flatpickr.min.css";
import "../css/dashboard.css";

const Finance = () => {
   const { isDark } = useContext(ThemeContext);
    
      // Choose colors based on theme
      const contentStyle = {
        background: isDark 
          ? "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.25), transparent 40%), radial-gradient(circle at 70% 70%, rgba(59,130,246,0.25), transparent 40%), #0f172a"
          : "#ffffff",
        color: isDark ? "#ffffff" : "#000000",
        minHeight: "100vh",
        padding: "20px",
        transition: "all 0.5s ease", // smooth transition
      };
  const [formData, setFormData] = useState({
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
  });

  const datePickerRef = useRef(null);

  useEffect(() => {
    if (datePickerRef.current) {
      flatpickr(datePickerRef.current, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        minDate: "today",
        disable: [
          function (date) {
            return date.getDay() === 0 || date.getDay() === 6; // Disable weekends
          },
        ],
        allowInput: true,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  const handleReset = () => {
    setFormData({
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
    });
  };

  return (
    <div className="dashboard-container">
      <TopNav />
      <div className="dashboard-wrapper">
        <SideNav />
        <main className="dashboard-content"style={contentStyle}>
          <div className="card mb-4">
            <div className="card-header">
              <div className="row mb-2">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#healthFormModal"
                  >
                    Expenses
                  </button>
                </div>
              </div>
              <h2 className="card-title">Finance Data</h2>
            </div>
            <div className="card-body">
              {/* Table goes here */}
              {/* ... */}
            </div>
          </div>

          {/* Modal */}
          <div
            className="modal fade"
            id="healthFormModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Daily Expenses</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>

                    {/* Pacing */}
                    <fieldset className="border rounded p-3 mb-3">
                      <legend className="w-auto text-primary">Add Expense</legend>
                      <div className="row mb-3">
                        <div className="col-4">
                          <label className="form-label">
                            Select Date:
                          </label>
                          <div className="input-group">
                            <input
                              ref={datePickerRef}
                              placeholder="YYYY-MM-DD"
                              className="form-control"
                              id="addPacingDateTimePicker"
                            />
                            <span className="input-group-text">
                              <i className="fa fa-calendar"></i>
                            </span>
                          </div>
                        </div>
                        
                       
                      </div>
                    </fieldset>

                    <div className="d-flex justify-content-end mb-3">
                      <button type="submit" className="btn btn-primary m-1">
                        Submit
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

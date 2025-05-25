import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import TopNav from "../component/Topbar";
import SideNav from "../component/Sidebar";

const Health = () => {
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
        <main className="dashboard-content">
          {/* Data Table Card */}
          <div className="card mb-4">
            <div className="card-header">
              {/* Row above title containing the Open Health Form button */}
              <div className="row mb-2">
                <div className="col">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#healthFormModal"
                  >
                    Open Health Form
                  </button>
                </div>
              </div>
              <h2 className="card-title">Patient Health Data</h2>
            </div>
            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Height (cm)</th>
                    <th>Weight (kg)</th>
                    <th>BMI</th>
                    <th>Blood Pressure</th>
                    <th>Blood Glucose (mg/dL)</th>
                    <th>Heart Rate (bpm)</th>
                    <th>Hair Density (per cm²)</th>
                    <th>Hair Loss Rate (strands/day)</th>
                    <th>Scalp Condition</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example row - add more rows or map over your data */}
                  <tr>
                    <td>1</td>
                    <td>30</td>
                    <td>Male</td>
                    <td>175</td>
                    <td>70</td>
                    <td>22.9</td>
                    <td>120/80</td>
                    <td>95</td>
                    <td>72</td>
                    <td>60</td>
                    <td>50</td>
                    <td>Good</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal with the Health Form */}
          <div
            className="modal fade"
            id="healthFormModal"
            tabIndex="-1"
            aria-labelledby="healthFormModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="healthFormModalLabel">
                    Health Details Form
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="health-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label>Age</label>
                      <input
                        type="number"
                        name="age"
                        className="form-control"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Gender</label>
                      <input
                        name="gender"
                        className="form-control"
                        value={formData.gender}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Height (cm)</label>
                      <input
                        type="number"
                        name="height"
                        className="form-control"
                        value={formData.height}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Weight (kg)</label>
                      <input
                        type="number"
                        name="weight"
                        className="form-control"
                        value={formData.weight}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label>BMI</label>
                      <input
                        type="number"
                        name="bmi"
                        className="form-control"
                        value={formData.bmi}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Blood Pressure</label>
                      <input
                        type="text"
                        name="bloodpressure"
                        className="form-control"
                        value={formData.bloodpressure}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Blood Glucose (mg/dL)</label>
                      <input
                        type="number"
                        name="bloodglucose"
                        className="form-control"
                        value={formData.bloodglucose}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Heart Rate (bpm)</label>
                      <input
                        type="number"
                        name="heartrate"
                        className="form-control"
                        value={formData.heartrate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Hair Density (per cm²)</label>
                      <input
                        type="number"
                        name="hairDensity"
                        className="form-control"
                        value={formData.hairDensity}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Hair Loss Rate (strands/day)</label>
                      <input
                        type="number"
                        name="hairLossRate"
                        className="form-control"
                        value={formData.hairLossRate}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label>Scalp Condition</label>
                      <input
                        type="text"
                        name="scalpCondition"
                        className="form-control"
                        value={formData.scalpCondition}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                      <button type="submit" className="btn btn-success">
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

export default Health;

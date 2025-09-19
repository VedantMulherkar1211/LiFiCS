import React, { useState, useContext } from "react";
import { ThemeContext } from "../component/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faBullseye, faDownload, faExpand, faPlus } from "@fortawesome/free-solid-svg-icons";
import TopNav from "../component/Topbar";
import SideNav from "../component/Sidebar";
import "../css/dashboard.css";

const Learning = () => {
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

  const [formData, setFormData] = useState({ learnText: "", learnDate: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    setIsModalOpen(false); // close modal
    setFormData({ learnText: "", learnDate: "" }); // reset form
  };

  return (
    <div className="dashboard-container">
      <TopNav />
      <div className="dashboard-wrapper">
        <SideNav />
        <main className="dashboard-content" style={contentStyle}>
          <div className="card-row">
            <div className="full-width-card card">
              <div className="card-header">
                <h2 className="card-title">Analytics Overview</h2>
                <div className="card-actions">
                  <FontAwesomeIcon icon={faShare} />
                  <FontAwesomeIcon icon={faBullseye} />
                  <FontAwesomeIcon icon={faDownload} />
                  <FontAwesomeIcon icon={faExpand} />
                  {/* Button to open modal */}
                  <button
                    className="add-btn"
                    onClick={() => setIsModalOpen(true)}
                    style={{
                      marginLeft: "10px",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      background: isDark ? "#3b82f6" : "#2563eb",
                      color: "#fff",
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add Learning
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="modal-overlay">
              <div
                className="modal-content"
                style={{
                  background: isDark ? "#1e293b" : "#fff",
                  padding: "20px",
                  borderRadius: "10px",
                  width: "400px",
                  margin: "100px auto",
                  boxShadow: "0px 0px 20px rgba(0,0,0,0.5)",
                }}
              >
                <h3 style={{ marginBottom: "15px" }}>Add New Learning</h3>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "15px" }}>
                    <label>Learning Text:</label>
                    <input
                      type="text"
                      name="learnText"
                      value={formData.learnText}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        marginTop: "5px",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "15px" }}>
                    <label>Select Date:</label>
                    <input
                      type="date"
                      name="learnDate"
                      value={formData.learnDate}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        marginTop: "5px",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      style={{
                        padding: "8px 14px",
                        borderRadius: "6px",
                        border: "none",
                        background: "#6b7280",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      style={{
                        padding: "8px 14px",
                        borderRadius: "6px",
                        border: "none",
                        background: "#16a34a",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Simple modal background styling */}
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top:0;
            left:0;
            right:0;
            bottom:0;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index:1000;
          }
        `}
      </style>
    </div>
  );
};

export default Learning;

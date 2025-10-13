import React, { useContext } from "react";
import { ThemeContext } from "../component/ThemeContext";
import TopNav from "../component/Topbar";
import SideNav from "../component/Sidebar";

import ColumnChart from "../component/ColumnCharts";
import LineChart from "../component/LineChart";
import RadialChart from "../component/RadialChart";
import "../css/dashboard.css";

const Dashboard = () => {
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

  return (
    <div className="dashboard-container">
      <TopNav />
      <div className="dashboard-wrapper">
        <SideNav />
        <main className="dashboard-content" style={contentStyle}>
          <div className="chart-grid">
            {/* Generate 5 rows, 3 columns */}
            {[...Array(5)].map((_, rowIndex) => (
              <React.Fragment key={rowIndex}>
                <div className="chart-cell">
                  <RadialChart />
                </div>
                <div className="chart-cell">
                  <ColumnChart />
                </div>
                <div className="chart-cell">
                  <LineChart />
                </div>
              </React.Fragment>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useContext } from "react";
import { ThemeContext } from "../component/ThemeContext";
import TopNav from '../component/Topbar';
import SideNav from '../component/Sidebar';

import ColumnChart from '../component/ColumnCharts';
import LineChart from '../component/LineChart';
import RadialChart from '../component/RadialChart';
import '../css/dashboard.css';

const Dashboard = () => {
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
  return (
    <div className="dashboard-container">
      <TopNav />
      <div className="dashboard-wrapper">
        <SideNav />
        <main className="dashboard-content" style={contentStyle}>
          <div className="content-area">
            <div className="container-fluid">
              <div className="main">
                {/* Row 2: Radial Chart */}
                <div className="row">
                  <div className="col-md-5 mb-4">
                    <div className="box columnbox">
                      <RadialChart />
                    </div>
                  </div>
                  <div className="col-md-7 mb-4">
                    <div className="box">
                      <RadialChart />
                    </div>
                  </div>
                </div>

                {/* Row 1: Column Chart & Line Chart */}
                <div className="row mt-4">
                  <div className="col-md-5 mb-4">
                    <div className="box columnbox">
                      <ColumnChart />
                    </div>
                  </div>
                  <div className="col-md-7 mb-4">
                    <div className="box">
                      <LineChart />
                    </div>
                  </div>
                </div>

                {/* Future Placeholder */}
                <div className="row">
                  <div className="col-12">
                    <div className="float-end edit-on-codepen"></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

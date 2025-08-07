import React from 'react';
import TopNav from '../component/Topbar';
import SideNav from '../component/Sidebar';
import '../css/dashboard.css';

import ColumnChart from '../component/ColumnCharts';
import LineChart from '../component/LineChart';
import RadialChart from '../component/RadialChart';
import ProgressBar from '../component/ProgressBar';

const Dashboard = () => {
return (
  <div className="dashboard-container">
    <TopNav />
    <div className="dashboard-wrapper">
      <SideNav />
      <main className="dashboard-content">
        <div className="content-area">
          <div className="container-fluid">
            <div className="main">
              {/* Row 2: Radial Chart & Progress Bars */}
              <div className="row">
                <div className="col-md-5 mb-4">
                  <div className="box columnbox">
                    <RadialChart />
                  </div>
                  <div className="col-md-7 mb-4">
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

              
                

              {/* Row 3: Future placeholder */}
              <div className="row">
                <div className="col-12">
                  <div className="float-end edit-on-codepen">
                    {/* Placeholder for future controls */}
                  </div>
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

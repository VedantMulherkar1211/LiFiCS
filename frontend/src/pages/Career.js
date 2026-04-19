import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faBullseye, faDownload, faExpand } from '@fortawesome/free-solid-svg-icons';
import Topbar from '../component/Topbar';
import Sidebar from '../component/Sidebar';
import { SidebarContext } from '../context/SidebarContext';
import '../css/dashboard.css';


const Career = () => {
  const { isSidebarCollapsed } = useContext(SidebarContext);
  return (
    <div className="dashboard-container">
      <Topbar />
      <div className="dashboard-wrapper">
        <Sidebar />
        <main className={`dashboard-content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="card-row">
            <div className="full-width-card card">
              <div className="card-header">
                <h2 className="card-title">Analytics Overview</h2>
                <div className="card-actions">
                  <FontAwesomeIcon icon={faShare} />
                  <FontAwesomeIcon icon={faBullseye} />
                  <FontAwesomeIcon icon={faDownload} />
                  <FontAwesomeIcon icon={faExpand} />
                </div>
              </div>
              
            </div>
          </div>

         
        </main>
      </div>
    </div>
  );
}
export default Career;



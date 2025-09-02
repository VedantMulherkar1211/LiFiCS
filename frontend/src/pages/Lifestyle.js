import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from "../component/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faBullseye, faDownload, faExpand } from '@fortawesome/free-solid-svg-icons';
import TopNav from '../component/Topbar';
import SideNav from '../component/Sidebar';
import '../css/dashboard.css';


const Lifestyle = () => {
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
export default Lifestyle;



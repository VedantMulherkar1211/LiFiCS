import React, { useState } from 'react';
import '../css/sidebar.css'; // Custom CSS
import Search from "../component/search";
import { useNavigate } from 'react-router-dom';
import {
  FaMoneyBillWave,
  FaBook,
  FaRunning,
  FaGraduationCap
} from "react-icons/fa";

import {
  Layout,
  Activity,
  BarChart,
  Folder,
  Settings,
} from 'react-feather';

function Sidebar() {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate(); // React Router navigation

  const toggleAnalytics = () => setIsAnalyticsOpen(!isAnalyticsOpen);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const handleDashboardClick = () => {
    navigate('/');
  };
  const handleHealthClick = () => {
    navigate('/health');
  };
  const handleFinanceClick = () => {
    navigate('/finance');
  };
  const handleCarearClick = () => {
    navigate('/carear');
  };
  const handleLifestyleClick = () => {
    navigate('/lifestyle');
  };
  const handleLearningClick = () => {
    navigate('/learning');
  };

  return (
    <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="logo-section">
        <div className="logo">LIFICS</div>
        <button className="collapse-toggle" onClick={toggleSidebarCollapse}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 11 21 15 17 19" />
            <polyline points="7 11 3 15 7 19" />
          </svg>
        </button>
      </div>

      <nav className="main-nav">
        <ul>
          <li className="nav-item">
          <button className="nav-button" onClick={handleDashboardClick}>
            <Layout className="nav-icon" size={16} />
            <span className="nav-label">Dashboard</span>
            </button>
          </li>

          <li className="nav-item">
          <button className="nav-button" onClick={handleHealthClick}>
            <Activity className="nav-icon" size={16} />
            <span className="nav-label">Health</span>
            {/* <span className="badge">10</span> */}
            </button>
          </li>

          <li className="nav-item">
            <button className="nav-button" onClick={handleFinanceClick}>
              <FaMoneyBillWave className="nav-icon" size={16} />
              <span className="nav-label">Finance</span>
              {/* <span className="badge">8</span> */}
            </button>
          </li>

          <li className="nav-item">
          <button className="nav-button" onClick={ handleCarearClick}>
            <FaBook className="nav-icon" size={16} />
            <span className="nav-label">Carear</span>
            {/* <span className="badge">8</span> */}
            </button>
          </li>

          <li className="nav-item">
          <button className="nav-button" onClick={ handleLifestyleClick}>
            <FaRunning className="nav-icon" size={16} />
            <span className="nav-label">Lifestyle</span>
            {/* <span className="badge">8</span> */}
            </button>
          </li>

          <li className="nav-item">
          <button className="nav-button" onClick={ handleLearningClick}>
            <FaGraduationCap className="nav-icon" size={16} />
            <span className="nav-label">Learning</span>
            {/* <span className="badge">8</span> */}
            </button>
          </li>

          <li className="nav-item collapsible" onClick={toggleAnalytics}>
            <BarChart className="nav-icon" size={16} />
            <span className="nav-label">Analytics</span>
            <svg className={`arrow-icon ${isAnalyticsOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </li>

          {isAnalyticsOpen && (
            <ul className="sub-menu">
              <li className="nav-item sub-item"><span className="nav-label">Health</span></li>
              <li className="nav-item sub-item"><span className="nav-label">Finance</span></li>
              <li className="nav-item sub-item"><span className="nav-label">Carear</span></li>
              <li className="nav-item sub-item"><span className="nav-label">Lifestyle</span></li>
              <li className="nav-item sub-item"><span className="nav-label">Learning</span></li>
            </ul>
          )}

          

          <li className="nav-item collapsible" onClick={toggleSettings}>
            <Settings className="nav-icon" size={16} />
            <span className="nav-label">Settings</span>
            <svg className={`arrow-icon ${isSettingsOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </li>

          {isSettingsOpen && (
            <ul className="sub-menu">
              <li className="nav-item sub-item"><span className="nav-label">Theme</span></li>
              <li className="nav-item sub-item"><span className="nav-label">User</span></li>
              <li className="nav-item sub-item"><span className="nav-label">User Config</span></li>
              <li className="nav-item sub-item"><span className="nav-label">System Config</span></li>
              <li className="nav-item sub-item"><span className="nav-label">Dashboard Config</span></li>
            </ul>
          )}

          {/* <div className="search-bar">
            <Search className="search-icon" size={8} />
            
          </div> */}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

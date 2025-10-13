import React, { useState, useContext, useRef } from 'react';
import { ThemeContext } from './ThemeContext';
import '../css/sidebar.css';
import { useNavigate } from 'react-router-dom';
import {
  FaWallet,
  FaChartLine,
  FaMoneyBillWave,
  FaBook,
  FaRunning,
  FaGraduationCap
} from "react-icons/fa";
import { Layout, Activity, BarChart, Settings } from 'react-feather';

function Sidebar() {
  const { isDark } = useContext(ThemeContext);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFinanceOpen, setIsFinanceOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const clickTimeout = useRef(null); // To differentiate single vs double click

  // Toggles
  const toggleAnalytics = () => setIsAnalyticsOpen(!isAnalyticsOpen);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleFinance = () => setIsFinanceOpen(!isFinanceOpen);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const sidebarStyle = {
    borderRight: isDark ? "2px solid #FFFF00" : "none",
    transition: "all 0.5s ease",
  };

  // Navigation
  const handleDashboardClick = () => navigate('/');
  const handleHealthClick = () => navigate('/health');
  const handleCareerClick = () => navigate('/carear');
  const handleLifestyleClick = () => navigate('/lifestyle');
  const handleLearningClick = () => navigate('/learning');
  const handleFinanceClick = () => navigate('/finance');
  const handleExpenseClick = () => navigate('/finance/expense');
  const handleInvestmentClick = () => navigate('/finance/investment');

  // ✅ Single click = navigate; Double click = toggle submenu
  const handleFinanceClickType = () => {
    if (clickTimeout.current) {
      // Double click detected
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      toggleFinance();
    } else {
      // Single click — wait briefly to check if second click comes
      clickTimeout.current = setTimeout(() => {
        handleFinanceClick();
        clickTimeout.current = null;
      }, 250); // 250ms window between clicks
    }
  };

  return (
    <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`} style={sidebarStyle}>
      <div className="logo-section">
        <div className="logo">LIFICS</div>
        <button className="collapse-toggle" onClick={toggleSidebarCollapse}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
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
            </button>
          </li>

          {/* ✅ Finance: Single click = navigate; Double click = expand/collapse */}
          <li className="nav-item collapsible">
            <button className="nav-button" onClick={handleFinanceClickType}>
              <FaMoneyBillWave className="nav-icon" size={16} />
              <span className="nav-label">Finance</span>
              <svg
                className={`arrow-icon ${isFinanceOpen ? 'open' : ''}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </li>

          {isFinanceOpen && (
            <ul className="sub-menu">
              <li className="nav-item sub-item">
                <button className="nav-button" onClick={handleExpenseClick}>
                  <FaWallet className="nav-icon" size={14} />
                  <span className="nav-label">Expense</span>
                </button>
              </li>
              <li className="nav-item sub-item">
                <button className="nav-button" onClick={handleInvestmentClick}>
                  <FaChartLine className="nav-icon" size={14} />
                  <span className="nav-label">Investment</span>
                </button>
              </li>
            </ul>
          )}

          <li className="nav-item">
            <button className="nav-button" onClick={handleCareerClick}>
              <FaBook className="nav-icon" size={16} />
              <span className="nav-label">Career</span>
            </button>
          </li>

          <li className="nav-item">
            <button className="nav-button" onClick={handleLifestyleClick}>
              <FaRunning className="nav-icon" size={16} />
              <span className="nav-label">Lifestyle</span>
            </button>
          </li>

          <li className="nav-item">
            <button className="nav-button" onClick={handleLearningClick}>
              <FaGraduationCap className="nav-icon" size={16} />
              <span className="nav-label">Learning</span>
            </button>
          </li>

         
          {/* Settings */}
          <li className="nav-item collapsible" onClick={toggleSettings}>
            <Settings className="nav-icon" size={16} />
            <span className="nav-label">Settings</span>
            <svg
              className={`arrow-icon ${isSettingsOpen ? 'open' : ''}`}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round">
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
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;

import React, { useState } from 'react';
import "../css/topbar.css";
import { Navbar } from "react-bootstrap";
import { 
  //Search,
  Layout, // Replacing LayoutDashboard with Layout
  Activity,
  List, // Replacing ListTask with List
  BarChart,
  Folder,
  Settings,
  BookOpen,
  Mail,
  User
} from 'react-feather';

const Topbar = () => {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleAnalytics = () => setIsAnalyticsOpen(!isAnalyticsOpen);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <Navbar className="topbar glass-navbar"  expand="lg">
       <div className="topbar-content container-fluid">
          <div className="topbar-left">
          <a className="navbar-brand" href="#">
            <img
              src="" // <-- Add your logo source here
            
              className="logo"
            />
          </a>
          <span className="lifics-title">LIFICS</span>
        </div>

        
      </div>

      <div className="user-profile" onClick={toggleUserMenu}>
        <div className="avatar">
          <User className="user-icon" size={20} /> {/* Replace with an actual image */}
        </div>
        <div className="user-info">
          <span className="user-name">Vedant Mulherkar</span>
          <span className="user-email">mulherkarvedant@gmail.com</span>
        </div>
        <svg className={`arrow-down-icon ${isUserMenuOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>

        {isUserMenuOpen && (
          <div className="user-menu">
            <div className="menu-item">View profile</div>
            <div className="menu-item">Account settings</div>
            <div className="menu-item">Analytics</div>
            <div className="menu-item logout">Log out</div>
          </div>
        )}
      </div>
    </Navbar>
    
  );
};

export default Topbar;

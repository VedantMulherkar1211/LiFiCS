import React, { useState } from 'react';
import '../css/sidebar.css'; // Create a new CSS file for the sidebar
import Search from "../component/search";
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

function Sidebar() {
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // For the minimized state

  const toggleAnalytics = () => setIsAnalyticsOpen(!isAnalyticsOpen);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);
  const toggleSidebarCollapse = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="logo-section">
        <div className="logo">LIFICS</div>
        <button className="collapse-toggle" onClick={toggleSidebarCollapse}>
          {/* Icon for collapse/expand */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 11 21 15 17 19" />
            <polyline points="7 11 3 15 7 19" />
          </svg>
        </button>
      </div>

      <nav className="main-nav">
        <ul>
          <li className="nav-item active"> {/* Add 'active' class for the highlighted item */}
            <Layout className="nav-icon" size={16} /> {/* Using Layout icon */}
            <span className="nav-label">Dashboard</span>
          </li>
          <li className="nav-item">
            <Activity className="nav-icon" size={16} />
            <span className="nav-label">Activity</span>
            <span className="badge">10</span>
          </li>
          <li className="nav-item">
            <List className="nav-icon" size={16} /> {/* Using List icon */}
            <span className="nav-label">My tasks</span>
            <span className="badge">8</span>
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
              <li className="nav-item sub-item">
                <span className="nav-label">Health</span>
              </li>
              <li className="nav-item sub-item">
                <span className="nav-label">Finance</span>
              </li>
              
              <li className="nav-item sub-item">
                <span className="nav-label">Carear</span>
              </li>
              
              <li className="nav-item sub-item">
                <span className="nav-label">Lifestyle</span>
              </li>
              <li className="nav-item sub-item">
                <span className="nav-label">Learning</span>
              </li>
              
              <li className="nav-item sub-item">
                <span className="nav-label">Learning</span>
              </li>
            </ul>
          )}

          <li className="nav-item">
            <Folder className="nav-icon" size={16} />
            <span className="nav-label">Projects</span>
          </li>

          <li className="nav-item collapsible" onClick={toggleSettings}>
            <Settings className="nav-icon" size={16} />
            <span className="nav-label">Settings</span>
            <svg className={`arrow-icon ${isSettingsOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </li>
          {isSettingsOpen && (
            <ul className="sub-menu">
              <li className="nav-item sub-item">
                <span className="nav-label">General</span>
              </li>
              <li className="nav-item sub-item">
                <span className="nav-label">Domains</span>
              </li>
              <li className="nav-item sub-item">
                <span className="nav-label">Integrations</span>
              </li>
              <li className="nav-item sub-item">
                <span className="nav-label">Billing</span>
              </li>
              <li className="nav-item sub-item">
                <span className="nav-label">Payouts</span>
              </li>
            </ul>
          )}

          <li className="nav-item">
            <BookOpen className="nav-icon" size={10} />
            <span className="nav-label">Documentation</span>
          </li>

          <div className="search-bar">
        <Search className="search-icon" size={10} />
        <input type="text"/>
      </div>
        </ul>
        </nav>
      
      
    </aside>
    
  );
}

export default Sidebar;

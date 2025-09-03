import React, { useContext, useState } from 'react';
import "../css/topbar.css";
import { Navbar } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { User } from 'react-feather';
import { ThemeContext } from "../component/ThemeContext";

const Topbar = () => {
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { toggleTheme, isDark } = useContext(ThemeContext); // get isDark

  const topbarStyle = {
    borderBottom: isDark ? "2px solid #FFFF00" : "none", // neon yellow border for dark mode
    transition: "all 0.5s ease",
  };

  const accboxstyle = {
    border:isDark?"5px solid #FFFF00":"2px solid #000000",
    transition: "all 0.5s ease",
  };

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => navigate('/Login');

  return (
    <Navbar className="topbar glass-navbar" expand="lg" style={topbarStyle}>
      <div className="topbar-content container-fluid">
        <div className="topbar-left">
          <span className="lifics-title">LIFICS</span>
        </div>
      </div>

      <div className="user-profile" onClick={toggleUserMenu}>
        <div className="avatar" >
          <User className="user-icon" size={20} />
        </div>
        <div className="user-info" >
          <span className="user-name">Vedant Mulherkar</span>
          <span className="user-email">mulherkarvedant@gmail.com</span>
        </div>
        <svg className={`arrow-down-icon ${isUserMenuOpen ? 'open' : ''}`} viewBox="0 0 24 24">
          <polyline points="6 9 12 15 18 9" />
        </svg>

        {isUserMenuOpen && (
          <div className="user-menu" >
            <div className="menu-item bg-dark" style={topbarStyle}>View profile</div>
            <div className="menu-item bg-dark">Account settings</div>
            <div className="menu-item bg-dark ">
              <button 
                id="theme-toggle" 
                className="btn btn-primary"
                onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
              >
                Switch to {isDark ? "Light" : "Dark"} Mode
              </button>
            </div>
            <div className="menu-item logout bg-dark " onClick={handleLogout}><b>Log out</b></div>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default Topbar;

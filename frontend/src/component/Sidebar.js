/*************  ✨ Codeium Command 🌟  *************/
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/sidebar.css";

const Sidebar = () => {
  return (
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark bg-dark d-flex flex-column" id="sidenavAccordion">
          <div className="sb-sidenav-menu pt-4 flex-grow-1">
            <div className="nav flex-column">
              
              {/* Dashboard */}
              <button type="button" className="nav-link remove-btn-border" id="dashboardBtn">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
              <button type="button" className="nav-link remove-btn-border" id="dashboardBtn">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt"></i>
                </div>
                Dashboard
              </button>
               

export default Sidebar;

/******  a183383b-8c8d-44b7-a636-9995fc94f193  *******/
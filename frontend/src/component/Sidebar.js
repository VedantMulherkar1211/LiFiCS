import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/sidebar.css";

const Sidebar = () => {
  return (
    <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
        <nav className="sb-sidenav accordion sb-sidenav-dark" role="navigation" id="sidenavAccordion">
          <div className="sb-sidenav-menu pt-4 bg-dark">
            <div className="nav">
              <button type="button" className="nav-link remove-btn-border" data-toggle="tab" id="dashboardBtn">
                <div className="sb-nav-link-icon">
                  <i className="fas fa-tachometer-alt" aria-hidden="true"></i>
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

export default Sidebar;

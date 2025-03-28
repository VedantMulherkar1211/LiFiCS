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

              {/* Sidebar Items */}
              {[
                { id: "health", name: "Health", icon: "fas fa-heartbeat" },
                { id: "finance", name: "Finance", icon: "fas fa-wallet" },
                { id: "lifestyle", name: "Lifestyle", icon: "fas fa-spa" },
                { id: "mental", name: "Mental", icon: "fas fa-brain" },
                { id: "career", name: "Career", icon: "fas fa-briefcase" },
                { id: "happiness", name: "Happiness", icon: "fas fa-smile" },
                { id: "social", name: "Social", icon: "fas fa-users" },
                { id: "overall", name: "Overall Report", icon: "fas fa-chart-bar" },
                { id: "improvements", name: "Improvements", icon: "fas fa-arrow-up" },
              ].map((item) => (
                <div key={item.id}>
                  <button 
                    className="nav-link nav-link-collapse collapsed" 
                    type="button"
                    data-toggle="collapse"
                    data-target={`#collapse${item.id}`}
                    aria-expanded="false"
                    aria-controls={`collapse${item.id}`}
                  >
                    <div className="sb-nav-link-icon">
                      <i className={item.icon}></i>
                    </div>
                    {item.name}
                    <div className="sb-sidenav-collapse-arrow">
                      <i className="fas fa-angle-down"></i>
                    </div>
                  </button>

                  <div className="collapse" id={`collapse${item.id}`} data-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                      <a className="nav-link" href={`/${item.id}-overview`}>Overview</a>
                      <a className="nav-link" href={`/${item.id}-reports`}>Reports</a>
                    </nav>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

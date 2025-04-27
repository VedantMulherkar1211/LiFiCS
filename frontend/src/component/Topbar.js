import React from "react";
import "../css/topbar.css";
import { Navbar } from "react-bootstrap";

const Topbar = () => {
  return (
    <Navbar bg="light" variant="light" className="topbar">
      <div className="topbar-content">
        <div className="topbar-left">
          <a className="navbar-brand" href="#">
            <img
              src="" // <-- Add your logo source here
              alt="LIFICS"
              className="logo"
            />
          </a>
          <span className="lifics-title">LIFICS</span>
        </div>

        <div className="topbar-right">
          <button className="btn btn-primary">
            Login
          </button>
        </div>
      </div>
    </Navbar>
  );
};

export default Topbar;

import React from "react";
import "../css/topbar.css";
import { Navbar, Container } from "react-bootstrap";

const Topbar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="mb-3">
      <a className="navbar-brand" href="#">
        <img
          src="" // Add your logo source here
          alt="LIFICS"
          style={{ height: '50px', marginRight: '20px' }} // Corrected inline style
        />
      </a>
      <button className="btn btn-primary"> {/* Add a label or functionality */}
        Click Me
      </button>
      <Container>
        <Navbar.Brand href="#">LIFICS</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Topbar;

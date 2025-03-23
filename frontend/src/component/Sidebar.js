import React from "react";
import { Nav } from "react-bootstrap";

const Sidebar = () => {
  return (
    <div className="bg-dark text-white p-3 vh-100 position-fixed" style={{ width: "250px" }}>
      <h4 className="text-center">Sidebar</h4>
      <Nav className="flex-column">
        <Nav.Link href="/" className="text-white">Home</Nav.Link>
        <Nav.Link href="/about" className="text-white">About</Nav.Link>
        <Nav.Link href="/contact" className="text-white">Contact</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;

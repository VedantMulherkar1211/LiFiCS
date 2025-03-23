import React from "react";
import { Navbar, Container } from "react-bootstrap";

const Topbar = () => {
  return (
    <Navbar bg="primary" variant="dark" className="mb-3">
      <Container>
        <Navbar.Brand href="#">My Dashboard</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Topbar;

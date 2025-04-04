import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../src/component/Login";
import Home from "../src/pages/Home";

const App = () => {
  const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/Login" />} />
        <Route path="*" element={<Navigate to="/Login" />} /> {/* Redirect unknown routes */}
      </Routes>
    </Router>
  );
};

export default App;

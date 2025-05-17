import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//components

//pages
import Login from "../src/component/Login";
import Dashboard from "../src/pages/Dashboard";
import Finance from "../src/pages/finance"; 
import FitDashboard from "../src/component/fitdata"; // ✅ Capitalized component name

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fit" element={<FitDashboard />} />
        <Route path="/finance" element={<Finance />} />
      </Routes>
    </Router>
  );
};

export default App;

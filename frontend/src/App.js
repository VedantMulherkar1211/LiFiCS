import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//components

//pages
import Login from "../src/component/Login";
import Dashboard from "../src/pages/Dashboard";
import Finance from "../src/pages/finance"; 
import Health from "../src/pages/health";
import Carear from "../src/pages/Carear";
import Lifestyle from "../src/pages/Lifestyle";
import Learning from "../src/pages/Learning";
import FitDashboard from "../src/component/fitdata"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fit" element={<FitDashboard />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/health" element={<Health />} />
        <Route path="/carear" element={<Carear />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
      </Routes>
    </Router>
  );
};

export default App;

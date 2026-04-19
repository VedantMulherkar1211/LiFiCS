import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SidebarProvider } from "./context/SidebarContext";
//components

//pages
import Login from "./component/Login";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/finance"; 
import Health from "./pages/health";
import Career from "./pages/Career";
import Lifestyle from "./pages/Lifestyle";
import Learning from "./pages/Learning";
import FitData from "./component/FitData"; // Capitalized component name

const App = () => {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/fit" element={<FitData />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/health" element={<Health />} />
          <Route path="/carear" element={<Career />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
};

export default App;

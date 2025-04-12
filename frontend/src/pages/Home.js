import React from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../component/Topbar";
import SideNav from "../component/Sidebar";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove authentication token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <TopNav/>
      <SideNav/>
      
    </div>
  );
};

export default Home;

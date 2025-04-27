import React from "react";
import { useNavigate } from "react-router-dom";
import TopNav from "../component/Topbar";
import SideNav from "../component/Sidebar";

const Home = () => {
 

  return (
    <div>
      <TopNav/>
      <SideNav/>
      
    </div>
  );
};

export default Home;

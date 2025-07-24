import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content" style={{ marginLeft: "250px", width: "100%" }}>
        <Topbar />
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

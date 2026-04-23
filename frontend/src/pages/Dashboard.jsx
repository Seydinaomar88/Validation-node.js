import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Overview from "../components/OverView";
import GestionPost from "../components/GestionPost";
import Users from "../components/Users";

const Dashboard = () => {
  const [pageActive, setPageActive] = useState("overview");

  const renderPage = () => {
    switch (pageActive) {
      case "overview":
        return <Overview />;
      case "posts":
        return <GestionPost />;
      case "users":
        return <Users />;
      default:
        return <Overview />;
    }
  };
  return (
    <div>
      <Sidebar pageActive={pageActive} setPageActive={setPageActive}>
        {renderPage()}
      </Sidebar>
    </div>
  );
};

export default Dashboard;

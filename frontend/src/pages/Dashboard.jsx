import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-main-gradient">
      <div className="flex h-screen overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col overfolow-hidden">
          <Header />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

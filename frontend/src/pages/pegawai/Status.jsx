import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

function Status() {
  const [currentPage, setCurrentPage] = useState("Status");

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

export default Status;

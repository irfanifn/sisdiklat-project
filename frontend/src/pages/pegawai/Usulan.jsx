import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

function Usulan() {
  const [currentPage, setCurrentPage] = useState("Usulan");
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

export default Usulan;

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainProfile from "../components/MainProfile";

function Profile() {
  const [currentPage, setCurrentPage] = useState("Profile");

  return (
    <div className="min-h-screen bg-main-gradient">
      <div className="flex h-screen overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col overfolow-hidden">
          <Header />
          <MainProfile />
        </div>
      </div>
    </div>
  );
}

export default Profile;

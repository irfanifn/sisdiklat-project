import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import EditProfile from "../components/EditProfile";
import MainProfile from "../components/MainProfile";

function Profile() {
  const [currentPage, setCurrentPage] = useState("Profile");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
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

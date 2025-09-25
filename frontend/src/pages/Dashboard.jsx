import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import PegawaiDashboard from "../pages/pegawai/PegawaiDashboard";
import AdminDashboard from "../pages/bkpsdm/AdminDashboard";
import { useUser } from "../contexts/UserContext";

function Dashboard() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-100 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700">
      <div className="flex h-screen overflow-hidden">
        <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          {/* Conditional Dashboard Content */}
          {user?.role === "bkpsdm" ? <AdminDashboard /> : <PegawaiDashboard />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

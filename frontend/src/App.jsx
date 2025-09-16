import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PegawaiDashboard from "./pages/pegawai/Dashboard";
import BKPSDMDashboard from "./pages/bkpsdm/Dashboard";
import PimpinanDashboard from "./pages/pimpinan/Dashboard";
import UserProfile from "./pages/Profile";
import PegawaiUsulan from "./pages/pegawai/Usulan";
import PegawaiStatus from "./pages/pegawai/Status";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile/:user_id" element={<UserProfile />} />
      <Route path="/pegawai/dashboard" element={<PegawaiDashboard />} />
      <Route path="/pegawai/usulan" element={<PegawaiUsulan />} />
      <Route path="/pegawai/status" element={<PegawaiStatus />} />
      <Route path="/bkpsdm/dashboard" element={<BKPSDMDashboard />} />
      <Route path="/pimpinan/dashboard" element={<PimpinanDashboard />} />
    </Routes>
  );
};

export default App;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PegawaiDashboard from "./pages/Dashboard";
import BKPSDMDashboard from "./pages/Dashboard";
import BKPSDMPengajuan from "./pages/bkpsdm/Pengajuan";
import BKPSDMStatus from "./pages/bkpsdm/AdminStatus";
import PimpinanDashboard from "./pages/Dashboard";
import UserProfile from "./pages/Profile";
import PegawaiUsulan from "./pages/pegawai/Usulan";
import PegawaiStatus from "./pages/pegawai/Status";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/dashboard" element={<PegawaiDashboard />} />
      <Route path="/pegawai/usulan" element={<PegawaiUsulan />} />
      <Route path="/pegawai/status" element={<PegawaiStatus />} />
      <Route path="/dashboard" element={<BKPSDMDashboard />} />
      <Route path="/bkpsdm/pengajuan" element={<BKPSDMPengajuan />} />
      <Route path="/bkpsdm/status" element={<BKPSDMStatus />} />
      <Route path="/dashboard" element={<PimpinanDashboard />} />
    </Routes>
  );
};

export default App;

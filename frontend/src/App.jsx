import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PegawaiDashboard from "./pages/pegawai/Dashboard";
import BKPSDMDashboard from "./pages/bkpsdm/Dashboard";
import PimpinanDashboard from "./pages/pimpinan/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/pegawai/dashboard" element={<PegawaiDashboard />} />
      <Route path="/bkpsdm/dashboard" element={<BKPSDMDashboard />} />
      <Route path="/pimpinan/dashboard" element={<PimpinanDashboard />} />
    </Routes>
  );
};

export default App;

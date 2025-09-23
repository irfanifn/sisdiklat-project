import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Zap } from "lucide-react";
import { useUser } from "../contexts/UserContext";

function Sidebar() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const { user, loading, logout } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main-gradient">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-primary text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-main-gradient">
        <div className="text-center bg-card p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <span className="material-symbols-rounded text-6xl text-secondary">
              person_off
            </span>
          </div>
          <h2 className="text-xl font-semibold text-primary mb-2">
            Authentication Required
          </h2>
          <p className="text-secondary mb-4">
            Silakan login untuk mengakses halaman ini
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-btn-primary text-contrast px-4 py-2 rounded-lg hover:bg-btn-primary transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        '$collapsed ? "w-20" : "w-72"} bg-header border-r border-custom flex flex-col relative z-10'
      }
    >
      {/* Logo */}
      <div className="p-6 border-custom">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>

          {/* </div>conditional Rendering */}
          <div>
            <h1 className="text-xl font-bold text-primary">E-TUBE</h1>
            <p className="text-xs text-secondary">Halaman {user.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-</ul>auto">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex w-full items-center px-3 py-2 text-left text-primary rounded-lg ${
                  isActive ? "bg-btn-primary" : "bg-btn-primary:hover"
                }`
              }
            >
              <span className="material-symbols-rounded mr-3">dashboard</span>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex w-full items-center px-3 py-2 text-left text-primary rounded-lg ${
                  isActive ? "bg-btn-primary" : "bg-btn-primary:hover"
                }`
              }
            >
              <span className="material-symbols-rounded mr-3">person</span>
              Profile
            </NavLink>
          </li>
          {user.role === "pegawai" ? (
            <li>
              <NavLink
                to="/pegawai/usulan"
                className={({ isActive }) =>
                  `flex w-full items-center px-3 py-2 text-left text-primary rounded-lg ${
                    isActive ? "bg-btn-primary" : "bg-btn-primary:hover"
                  }`
                }
              >
                <span className="material-symbols-rounded mr-3">
                  assignment
                </span>
                Usulan
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="/bkpsdm/pengajuan"
                className={({ isActive }) =>
                  `flex w-full items-center px-3 py-2 text-left text-primary rounded-lg ${
                    isActive ? "bg-btn-primary" : "bg-btn-primary:hover"
                  }`
                }
              >
                <span className="material-symbols-rounded mr-3">
                  assignment
                </span>
                Pengajuan
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/pegawai/status"
              className={({ isActive }) =>
                `flex w-full items-center px-3 py-2 text-left text-primary rounded-lg ${
                  isActive ? "bg-btn-primary" : "bg-btn-primary:hover"
                }`
              }
            >
              <span className="material-symbols-rounded mr-3">
                check_circle
              </span>
              Riwayat Status
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <button
          onClick={logout}
          className="flex items-center justify-center space-x-3 p-2 text-primary font-extrabold rounded-xl bg-btn-logout bg-button-logout-hover w-full cursor-pointer"
        >
          <span className="material-symbols-rounded mr-3">logout</span>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

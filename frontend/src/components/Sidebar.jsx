import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Zap } from "lucide-react";
import { useUser } from "../contexts/UserContext";

function Sidebar() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const { user, loading, logout } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-950 dark:to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-900 dark:text-gray-100 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-950 dark:to-black">
        <div className="text-center bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <span className="material-symbols-rounded text-6xl text-gray-600 dark:text-gray-400">
              person_off
            </span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Silakan login untuk mengakses halaman ini
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
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
        "bg-gray-50 dark:bg-slate-900 border-r border-gray-200 dark:border-gray-700 flex flex-col relative z-10"
      }
    >
      {/* Logo */}
      <div className="p-6 border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              E-TUBE
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Halaman {user.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex w-full items-center px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                    : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800"
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
                `flex w-full items-center px-3 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                    : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`
              }
            >
              <span className="material-symbols-rounded mr-3">person</span>
              Profile
            </NavLink>
          </li>
          {user.role === "pegawai" ? (
            <>
              <li>
                <NavLink
                  to="/pegawai/usulan"
                  className={({ isActive }) =>
                    `flex w-full items-center px-3 py-2 rounded-lg ${
                      isActive
                        ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                        : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  <span className="material-symbols-rounded mr-3">
                    assignment
                  </span>
                  Usulan
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pegawai/status"
                  className={({ isActive }) =>
                    `flex w-full items-center px-3 py-2 rounded-lg ${
                      isActive
                        ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                        : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  <span className="material-symbols-rounded mr-3">
                    check_circle
                  </span>
                  Riwayat Status
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/bkpsdm/pengajuan"
                  className={({ isActive }) =>
                    `flex w-full items-center px-3 py-2 rounded-lg ${
                      isActive
                        ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                        : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  <span className="material-symbols-rounded mr-3">
                    assignment
                  </span>
                  Pengajuan
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/bkpsdm/status"
                  className={({ isActive }) =>
                    `flex w-full items-center px-3 py-2 rounded-lg ${
                      isActive
                        ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                        : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  <span className="material-symbols-rounded mr-3">
                    check_circle
                  </span>
                  Riwayat Status
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center justify-center space-x-3 p-2 font-extrabold rounded-xl bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white w-full cursor-pointer"
        >
          <span className="material-symbols-rounded mr-3">logout</span>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

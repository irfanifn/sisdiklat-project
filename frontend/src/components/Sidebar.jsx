import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Zap } from "lucide-react";
import { useUser } from "../contexts/UserContext";

function Sidebar() {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Silakan Login</div>;
  }

  return (
    <div
      className={
        '$collapsed ? "w-20" : "w-72"} transition duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-x1 border-r border-slate-200/50 dark:border-slate-700 flex flex-col relative z-10'
      }
    >
      {/* Logo */}
      <div className="p-6 border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>

          {/* conditional Rendering */}
          <div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">
              E-TUBE
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
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
              to="/pegawai/dashboard"
              className={({ isActive }) =>
                `flex w-full items-center px-3 py-2 text-left text-slate-700 dark:text-slate-200 rounded-lg transition ${
                  isActive
                    ? "bg-blue-200 dark:bg-blue-900"
                    : "hover:bg-blue-100 dark:hover:bg-slate-800"
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
                `flex w-full items-center px-3 py-2 text-left text-slate-700 dark:text-slate-200 rounded-lg transition ${
                  isActive
                    ? "bg-blue-200 dark:bg-blue-900"
                    : "hover:bg-blue-100 dark:hover:bg-slate-800"
                }`
              }
            >
              <span className="material-symbols-rounded mr-3">person</span>
              Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/pegawai/usulan"
              className={({ isActive }) =>
                `flex w-full items-center px-3 py-2 text-left text-slate-700 dark:text-slate-200 rounded-lg transition ${
                  isActive
                    ? "bg-blue-200 dark:bg-blue-900"
                    : "hover:bg-blue-100 dark:hover:bg-slate-800"
                }`
              }
            >
              <span className="material-symbols-rounded mr-3">assignment</span>
              Usulan
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/pegawai/status"
              className={({ isActive }) =>
                `flex w-full items-center px-3 py-2 text-left text-slate-700 dark:text-slate-200 rounded-lg transition ${
                  isActive
                    ? "bg-blue-200 dark:bg-blue-900"
                    : "hover:bg-blue-100 dark:hover:bg-slate-800"
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

      {/* Profile */}
      {/* <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGcgqpgCNw20mMHzdAYQLPHmp8Ze7BBDojEg&s"
            alt="user"
            className="w-10 h-10 rounded-full ring-2 ring-blue-500"
          />
          <div className="flex-1 min-w-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                Irfan
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                Pegawai
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Sidebar;

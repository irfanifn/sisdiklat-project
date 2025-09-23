import React from "react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

function Header() {
  const location = useLocation();
  const { user, loading } = useUser();
  const { isDark, toggleTheme } = useTheme();
  console.log("Current theme:", isDark ? "dark" : "light");

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

  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/pegawai/status":
        return "Riwayat Status";
      case "/pegawai/usulan":
        return "Usulan";
      case "/bkpsdm/pengajuan":
        return "Pengajuan";
      case "/bkpsdm/status":
        return "Riwayat status";
      default:
        return "Profile";
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg text-gray-900 dark:text-gray-100">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:block">
            <h1 className="text-2xl font-black text-gray-900 dark:text-gray-100">
              {getTitle()}
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              Welcome, {user.nama}!
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md transition-colors ${
              isDark
                ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 3v1m0 16v1m8.66-8.66l-.71.71M4.05 4.05l-.71.71M21 12h-1M4 12H3m16.24 4.24l-.71-.71M4.05 19.95l-.71-.71M12 5a7 7 0 100 14 7 7 0 000-14z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

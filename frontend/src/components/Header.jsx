import React from "react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

function Header() {
  const location = useLocation();
  const { user, loading } = useUser();
  const { isDark, toggleTheme } = useTheme();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Silakan Login</div>;
  }

  const getTitle = () => {
    switch (location.pathname) {
      case "/pegawai/dashboard":
        return "Dashboard";
      case "/pegawai/status":
        return "Riwayat Status";
      case "/pegawai/usulan":
        return "Usulan";
      default:
        return "Profile";
    }
  };
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:block">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">
              {getTitle()}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              Welcome, {user.nama}!
            </p>
          </div>
        </div>
        {/* Right Section */}
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

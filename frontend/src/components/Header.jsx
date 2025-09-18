import React from "react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function Header() {
  const location = useLocation();
  const { user, loading } = useUser();

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
            <Menu className="w-5 h-5"></Menu>
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
      </div>
    </div>
  );
}

export default Header;

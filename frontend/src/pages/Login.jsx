import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../configs/constant.js";

function Login() {
  const [nip, setNip] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/users/login`, {
        nip: nip,
      });

      if (response.data.success) {
        // Simpan token & user data
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect berdasarkan role
        const userRole = response.data.user.role.toLowerCase();

        switch (userRole) {
          case "pegawai":
            navigate("/pegawai/dashboard");
            break;
          case "bkpsdm":
            navigate("/bkpsdm/dashboard");
            break;
          case "pimpinan":
            navigate("/pimpinan/dashboard");
            break;
          default:
            setError("Role tidak dikenali");
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Login gagal. Silakan coba lagi.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-center text-sm">
              {error}
            </div>
          )}

          <div className="relative">
            <input
              type="number"
              placeholder="Nomor Induk Pegawai (NIP)"
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={nip}
              onChange={(e) => setNip(e.target.value)}
              required
            />
            <span className="material-symbols-rounded absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-2xl">
              dialpad
            </span>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

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
    <div className="login-container">
      <h1 className="form-title">Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="error-message">{error}</div>}

        <div className="input-wrapper">
          <input
            type="number"
            placeholder="Nomor Induk Pegawai (NIP)"
            className="input-field"
            value={nip}
            onChange={(e) => setNip(e.target.value)}
            required
          />
          <span className="material-symbols-rounded">numbers</span>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Loading..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default Login;

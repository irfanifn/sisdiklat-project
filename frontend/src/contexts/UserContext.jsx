import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../configs/constant.js";

// Objek context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mengambil data user yang sedang login
  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/profile`);
      setUser(res.data);
    } catch (err) {
      console.error("Gagal mengambil data user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook untuk menggunakan context
export const useUser = () => {
  return useContext(UserContext);
};

export default UserContext;

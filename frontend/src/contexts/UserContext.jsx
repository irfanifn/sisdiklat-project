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
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        return;
      }

      const res = await axios.get(`${baseUrl}/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.data);
    } catch (err) {
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

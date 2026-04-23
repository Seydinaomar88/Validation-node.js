/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import apiClient from "../services/apiClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    try {
      const response = await apiClient.post("/auth/login", userData);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log("Erreur sur login :", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiClient.post("/auth/register", userData);
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.log("Erreur sur register :", error);
      throw error;
    }
  };
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilise dans AuthContext");
  }

  return context;
};

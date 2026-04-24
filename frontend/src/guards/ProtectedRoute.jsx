import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || !user.token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "@/store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function PrivateRoute({ children, requiredRole }) {
  const { user, attributes, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  // Check user role from attribute or Cognito group
  const role =
    attributes?.role ||
    attributes?.["custom:role"] ||
    (user?.signInUserSession?.idToken?.payload?.["cognito:groups"]?.[0]);

  if (requiredRole && role?.toLowerCase() !== requiredRole.toLowerCase()) {
    return <Navigate to="/" replace />;
  }
  return children;
}

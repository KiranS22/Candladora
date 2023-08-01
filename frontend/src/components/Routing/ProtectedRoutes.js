import React from "react";
import { selectIsLoggedIn } from "../../Redux/features/Slices/Auth/Auth";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoutes = () => {
  const loggedIn = useSelector(selectIsLoggedIn);

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

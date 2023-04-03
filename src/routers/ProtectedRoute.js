import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// đăng nhập trước khi truy cập đến các route con
const ProtectedRoute = () => {
  const token = window.localStorage.getItem("token");
  return (
    !token ? <Navigate to="/signin"/> : <Outlet/>
  )
}

// sử dụng với checkout
export const ProtectedCheckout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    !isAuthenticated ? <Navigate to="/cart"/> : <Outlet/>
  )
}

// chưa đăng nhập thì bị chuyển đến trang chủ
export const ProtectedUrl = () => {
  return (
    <Navigate to="/"/>
  )
}

// chưa đăng nhập thì đến trang sigin
export const Protected = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

// role == admin mới được truy cập
export const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
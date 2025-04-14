import {Routes, Route } from "react-router";
import { LoginPage,RegisterPage,Home, UserDetails } from "../../pages";
import ProtectedRoute from "./ProtectedRoute";
import useAuthStore, {IAuth } from "../stores/authStore";
import { Navigate } from "react-router";

export const RouterService = () => {
    const token = useAuthStore((state : IAuth) => state.token);
    return (
        <>
        <Routes>
            <Route
            path="/"
        element={<Navigate to={token ? "/home" : "/login"} replace />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/home" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={token ? <Navigate to="/home" replace /> : <RegisterPage />}
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute token={token}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/:id"
        element={
          <ProtectedRoute token={token}>
            <UserDetails />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to={token ? "/home" : "/login"} replace />} />
        </Routes>
        </>
    )
}
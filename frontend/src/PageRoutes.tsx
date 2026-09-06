import { Navigate, Outlet, Route, Routes } from "react-router";

import "./index.css";
import { AccountPage } from "./pages/AccountPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TransactionsPage } from "./pages/TransactionsPage";

interface PrivateRouteProps {
  isAuthenticated: boolean;
}

function PrivateRoute({ isAuthenticated }: PrivateRouteProps) {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export function PageRoutes() {
  // TODO: Replace with your authentication logic
  const isAuthenticated = false;

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

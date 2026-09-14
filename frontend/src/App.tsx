import { Navigate, Outlet, Route, Routes } from "react-router";

import { AccountPage } from "@/pages/AccountPage";
import { CategoriesPage } from "@/pages/CategoriesPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { ResetPasswordPage } from "@/pages/ResetPasswordPage";
import { TransactionsPage } from "@/pages/TransactionsPage";
import { useAuthStore } from "@/store/auth.store";
import { ProtectedPageLayout, PublicPageLayout } from "./Layout";

function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    <ProtectedPageLayout>
      <Outlet />
    </ProtectedPageLayout>
  ) : (
    <Navigate to="/login" replace />
  );
}

function PublicRoute() {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    <PublicPageLayout>
      <Outlet />
    </PublicPageLayout>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
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

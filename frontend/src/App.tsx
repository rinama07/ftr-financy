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
import { ROUTES } from "./routes";

function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    <ProtectedPageLayout>
      <Outlet />
    </ProtectedPageLayout>
  ) : (
    <Navigate to={ROUTES.public.login} replace />
  );
}

function PublicRoute() {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? (
    <Navigate to={ROUTES.base} replace />
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
        <Route path={ROUTES.base} element={<LoginPage />} />
        <Route path={ROUTES.public.login} element={<LoginPage />} />
        <Route path={ROUTES.public.register} element={<RegisterPage />} />
        <Route
          path={ROUTES.public.reset_password}
          element={<ResetPasswordPage />}
        />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.base} element={<DashboardPage />} />
        <Route path={ROUTES.private.dashboard} element={<DashboardPage />} />
        <Route
          path={ROUTES.private.transactions}
          element={<TransactionsPage />}
        />
        <Route path={ROUTES.private.categories} element={<CategoriesPage />} />
        <Route path={ROUTES.private.account} element={<AccountPage />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.base} replace />} />
    </Routes>
  );
}

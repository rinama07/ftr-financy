import { useEffect } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router";
import { toast } from "sonner";

import { APP_EVENTS } from "./constants/events";
import { ProtectedPageLayout, PublicPageLayout } from "./Layout";
import { AccountPage } from "./pages/AccountPage";
import { CategoriesPage } from "./pages/CategoriesPage";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { TransactionsPage } from "./pages/TransactionsPage";
import { ROUTES } from "./routes";
import { useAuthStore } from "./store/auth/auth.store";

function RootRedirect() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Navigate
      to={isAuthenticated ? ROUTES.private.dashboard : ROUTES.public.login}
      replace
    />
  );
}

function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? (
    <ProtectedPageLayout>
      <Outlet />
    </ProtectedPageLayout>
  ) : (
    <Navigate to={ROUTES.public.login} replace />
  );
}

function PublicRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? (
    <Navigate to={ROUTES.private.dashboard} replace />
  ) : (
    <PublicPageLayout>
      <Outlet />
    </PublicPageLayout>
  );
}

export function App() {
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const handleUnauthenticated = () => {
      logout();

      toast.error("Sua sessão expirou. Faça login novamente.");
    };

    window.addEventListener(
      APP_EVENTS.AUTH_UNAUTHENTICATED,
      handleUnauthenticated,
    );

    return () => {
      window.removeEventListener(
        APP_EVENTS.AUTH_UNAUTHENTICATED,
        handleUnauthenticated,
      );
    };
  }, [logout]);

  return (
    <Routes>
      <Route path={ROUTES.base} element={<RootRedirect />} />

      <Route element={<PublicRoute />}>
        <Route path={ROUTES.public.login} element={<LoginPage />} />
        <Route path={ROUTES.public.register} element={<RegisterPage />} />
        <Route
          path={ROUTES.public.reset_password}
          element={<ResetPasswordPage />}
        />
      </Route>

      <Route element={<ProtectedRoute />}>
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

import { NavLink } from "react-router";

import { Avatar } from "./components/Avatar";
import { Logo } from "./components/Logo";
import { Toaster } from "./components/ui/sonner";
import { ROUTES } from "./routes";

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="bg-gray-100 h-screen w-screen flex flex-col overflow-hidden">
      {children}
      <Toaster />
    </div>
  );
}

export function PublicPageLayout({ children }: PageLayoutProps) {
  return (
    <PageLayout>
      <div className="flex-1 flex flex-col items-center py-12">
        <header>
          <Logo className="h-8" />
        </header>

        <main className="flex flex-col flex-1 w-full items-center justify-center">
          {children}
        </main>
      </div>
    </PageLayout>
  );
}

export function ProtectedPageLayout({ children }: PageLayoutProps) {
  const links = [
    {
      to: ROUTES.private.dashboard,
      label: "Dashboard",
    },
    {
      to: ROUTES.private.transactions,
      label: "Transações",
    },
    {
      to: ROUTES.private.categories,
      label: "Categorias",
    },
  ];

  return (
    <PageLayout>
      <div className="flex-1 flex flex-col py-12">
        <header className="flex flex-row items-center justify-between gap-8">
          <Logo className="h-6" />

          <nav className="flex flex-row gap-5">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive ? "text-primary font-semibold" : ""
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <NavLink to={ROUTES.private.account}>
            <Avatar />
          </NavLink>
        </header>

        <main className="flex flex-col flex-1 w-full items-center justify-center">
          {children}
        </main>
      </div>
    </PageLayout>
  );
}

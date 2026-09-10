import logo from "./assets/logo.svg";

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="bg-gray-100 h-screen w-screen flex flex-col">
      {children}
    </div>
  );
}

export function UnauthenticatedPageLayout({ children }: PageLayoutProps) {
  return (
    <PageLayout>
      <div className="flex-1 flex flex-col items-center py-12">
        <header>
          <img src={logo} alt="Financy Logo" className="h-8" />
        </header>

        <main className="flex flex-col flex-1 w-full items-center justify-center">
          {children}
        </main>
      </div>
    </PageLayout>
  );
}

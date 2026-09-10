interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="bg-gray-100 h-screen w-screen flex flex-col">
      {children}
    </div>
  );
}

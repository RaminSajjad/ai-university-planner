import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

export function AppShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName?: string | null;
}) {
  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Navbar userName={userName} />
        <main>{children}</main>
      </div>
    </div>
  );
}

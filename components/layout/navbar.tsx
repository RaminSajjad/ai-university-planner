import { LogoutButton } from "@/components/auth/logout-button";

export function Navbar({ userName }: { userName?: string | null }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark sticky top-0 z-30">
      <div className="md:hidden font-semibold">AI Uni Planner</div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-4">
        <span className="text-small text-slate-500 dark:text-slate-400 hidden sm:inline">
          {userName}
        </span>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-small">
          {userName?.[0]?.toUpperCase() ?? "U"}
        </div>
        <LogoutButton />
      </div>
    </header>
  );
}

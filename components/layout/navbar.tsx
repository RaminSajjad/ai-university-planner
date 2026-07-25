import Link from "next/link";
import { Bell, Menu } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function Navbar({
  userName,
  unreadCount = 0,
  onMenuClick,
}: {
  userName?: string | null;
  unreadCount?: number;
  onMenuClick?: () => void;
}) {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-background-light dark:bg-background-dark sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="md:hidden text-slate-500 dark:text-slate-400" aria-label="Open menu">
          <Menu className="w-6 h-6" />
        </button>
        <span className="md:hidden font-semibold">AI Uni Planner</span>
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Link href="/notifications" className="relative text-slate-500 dark:text-slate-400 hover:text-primary transition">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-danger text-white text-[10px] flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>
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

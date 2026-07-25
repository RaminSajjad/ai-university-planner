"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { PageFade } from "./page-fade";

export function AppShellClient({
  children,
  userName,
  unreadCount,
}: {
  children: React.ReactNode;
  userName?: string | null;
  unreadCount: number;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex-1 min-w-0">
        <Navbar userName={userName} unreadCount={unreadCount} onMenuClick={() => setMobileOpen(true)} />
        <main>
          <PageFade>{children}</PageFade>
        </main>
      </div>
    </div>
  );
}

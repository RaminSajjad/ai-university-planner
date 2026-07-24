"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="flex items-center gap-2 text-small text-slate-500 dark:text-slate-400 hover:text-danger transition"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </button>
  );
}

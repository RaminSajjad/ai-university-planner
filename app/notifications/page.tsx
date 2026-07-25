import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <AppShell userName={session.user?.name}>
      <div className="p-6">
        <h1 className="text-subheading font-semibold mb-4">Notifications</h1>
        <div className="card">
          <p className="text-slate-500 dark:text-slate-400">
            Notifications will appear here — coming in Phase 5.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

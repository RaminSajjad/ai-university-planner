import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";

export default async function PlannerPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <AppShell userName={session.user?.name}>
      <div className="p-6">
        <h1 className="text-subheading font-semibold mb-4 capitalize">planner</h1>
        <div className="card">
          <p className="text-slate-500 dark:text-slate-400">
            planner page — we'll build this out in a later phase.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

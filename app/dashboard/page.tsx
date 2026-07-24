import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-subheading font-semibold">
          Welcome, {session.user?.name?.split(" ")[0]} 👋
        </h1>
        <LogoutButton />
      </div>
      <div className="card">
        <p className="text-slate-500 dark:text-slate-400">
          You&apos;re logged in as {session.user?.email}. Full dashboard (CGPA, assignments,
          exams, study plan, charts) is coming in Phase 5.
        </p>
      </div>
    </div>
  );
}

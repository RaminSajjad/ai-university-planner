import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AppShell } from "@/components/layout/app-shell";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PasswordForm } from "@/components/settings/password-form";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <AppShell userName={session.user?.name}>
      <div className="p-6 space-y-4 max-w-lg">
        <h1 className="text-subheading font-semibold mb-2">Settings</h1>

        <div className="card flex items-center justify-between">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-small text-slate-500 dark:text-slate-400">
              Switch between light and dark theme
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="card">
          <p className="font-medium mb-1">Notifications</p>
          <p className="text-small text-slate-500 dark:text-slate-400">
            Assignment and exam reminders are generated automatically — coming soon: custom preferences.
          </p>
        </div>

        <div className="card">
          <p className="font-medium mb-3">Password</p>
          <PasswordForm />
        </div>

        <div className="card">
          <p className="font-medium mb-1">Study Preferences</p>
          <p className="text-small text-slate-500 dark:text-slate-400">
            Your default study hours and preferred time are set each time you generate a plan on the Planner page.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

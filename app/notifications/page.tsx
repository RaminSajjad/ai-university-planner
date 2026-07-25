import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { generateAutoNotifications, getNotifications } from "@/actions/notifications";
import { NotificationsClient } from "@/components/notifications/notifications-client";
import { AppShell } from "@/components/layout/app-shell";

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // Check for anything due soon and create notifications before loading the list
  await generateAutoNotifications();
  const notifications = await getNotifications();

  return (
    <AppShell userName={session.user?.name}>
      <NotificationsClient initialNotifications={notifications} />
    </AppShell>
  );
}

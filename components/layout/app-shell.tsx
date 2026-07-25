import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppShellClient } from "./app-shell-client";

export async function AppShell({
  children,
  userName,
}: {
  children: React.ReactNode;
  userName?: string | null;
}) {
  const session = await getServerSession(authOptions);
  const unreadCount = session?.user?.id
    ? await prisma.notification.count({ where: { userId: session.user.id, isRead: false } })
    : 0;

  return (
    <AppShellClient userName={userName} unreadCount={unreadCount}>
      {children}
    </AppShellClient>
  );
}

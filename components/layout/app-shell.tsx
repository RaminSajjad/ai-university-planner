import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

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
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Navbar userName={userName} unreadCount={unreadCount} />
        <main>{children}</main>
      </div>
    </div>
  );
}

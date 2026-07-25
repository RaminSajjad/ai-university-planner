"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import type { Notification } from "@prisma/client";
import { NotificationItem } from "./notification-item";
import { EmptyState } from "@/components/ui/empty-state";
import { markNotificationRead, markAllNotificationsRead } from "@/actions/notifications";

export function NotificationsClient({ initialNotifications }: { initialNotifications: Notification[] }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  async function handleMarkRead(id: string) {
    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    await markNotificationRead(id);
  }

  async function handleMarkAllRead() {
    setNotifications((list) => list.map((n) => ({ ...n, isRead: true })));
    await markAllNotificationsRead();
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-subheading font-semibold">
          Notifications {unreadCount > 0 && <span className="text-primary text-body">({unreadCount})</span>}
        </h1>
        {unreadCount > 0 && (
          <button onClick={handleMarkAllRead} className="text-small text-primary hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={Bell} title="No Notifications" actionLabel="Refresh" onAction={() => window.location.reload()} />
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} onMarkRead={() => handleMarkRead(n.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

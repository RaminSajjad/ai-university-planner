"use client";

import { ClipboardList, CalendarClock, CheckCircle2, Sparkles, AlertTriangle } from "lucide-react";
import type { Notification } from "@prisma/client";

const iconMap = {
  ASSIGNMENT_DUE: ClipboardList,
  EXAM_SOON: CalendarClock,
  TASK_COMPLETED: CheckCircle2,
  STUDY_PLAN_GENERATED: Sparkles,
  MISSED_DEADLINE: AlertTriangle,
};

const colorMap = {
  ASSIGNMENT_DUE: "bg-warning/10 text-warning",
  EXAM_SOON: "bg-danger/10 text-danger",
  TASK_COMPLETED: "bg-success/10 text-success",
  STUDY_PLAN_GENERATED: "bg-primary/10 text-primary",
  MISSED_DEADLINE: "bg-danger/10 text-danger",
};

export function NotificationItem({
  notification,
  onMarkRead,
}: {
  notification: Notification;
  onMarkRead: () => void;
}) {
  const Icon = iconMap[notification.type];

  return (
    <div
      className={`card flex items-start gap-4 ${!notification.isRead ? "border-l-4 border-l-primary" : "opacity-70"}`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorMap[notification.type]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium">{notification.title}</p>
          {!notification.isRead && (
            <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" aria-label="Unread" />
          )}
        </div>
        <p className="text-small text-slate-500 dark:text-slate-400">{notification.message}</p>
        {!notification.isRead && (
          <button onClick={onMarkRead} className="text-small text-primary hover:underline mt-2">
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
}

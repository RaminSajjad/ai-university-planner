"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("You must be logged in to do this");
  return session.user.id;
}

export async function getNotifications() {
  const userId = await requireUserId();
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
}

export async function markNotificationRead(id: string) {
  const userId = await requireUserId();
  const notif = await prisma.notification.findUnique({ where: { id } });
  if (!notif || notif.userId !== userId) throw new Error("Notification not found");

  await prisma.notification.update({ where: { id }, data: { isRead: true } });
  revalidatePath("/notifications");
}

export async function markAllNotificationsRead() {
  const userId = await requireUserId();
  await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
  revalidatePath("/notifications");
}

// Scans the student's real assignments and exams and creates notifications
// for anything due soon that doesn't already have one. Safe to call repeatedly —
// it checks for an existing notification before creating a duplicate.
export async function generateAutoNotifications() {
  const userId = await requireUserId();
  const now = new Date();
  const in2Days = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
  const in1Day = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);

  const [dueSoonAssignments, soonExams, existingNotifications] = await Promise.all([
    prisma.assignment.findMany({
      where: { userId, status: { not: "COMPLETED" }, deadline: { gte: now, lte: in2Days } },
      include: { course: true },
    }),
    prisma.exam.findMany({
      where: { userId, date: { gte: now, lte: in1Day } },
      include: { course: true },
    }),
    prisma.notification.findMany({ where: { userId } }),
  ]);

  const existingTitles = new Set(existingNotifications.map((n) => n.title));
  const toCreate: { title: string; message: string; type: "ASSIGNMENT_DUE" | "EXAM_SOON" }[] = [];

  for (const a of dueSoonAssignments) {
    const title = `Assignment Due: ${a.title}`;
    if (!existingTitles.has(title)) {
      toCreate.push({
        title,
        message: `${a.title} for ${a.course.courseName} is due soon.`,
        type: "ASSIGNMENT_DUE",
      });
    }
  }

  for (const e of soonExams) {
    const title = `Exam Tomorrow: ${e.course.courseName}`;
    if (!existingTitles.has(title)) {
      toCreate.push({
        title,
        message: `${e.examType} for ${e.course.courseName} is coming up soon.`,
        type: "EXAM_SOON",
      });
    }
  }

  if (toCreate.length > 0) {
    await prisma.notification.createMany({
      data: toCreate.map((n) => ({ ...n, userId })),
    });
  }
}

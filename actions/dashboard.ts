"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("You must be logged in to do this");
  return session.user.id;
}

export async function getDashboardData() {
  const userId = await requireUserId();
  const now = new Date();

  const [user, courses, assignments, upcomingExams, latestPlan] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.course.findMany({ where: { userId } }),
    prisma.assignment.findMany({ where: { userId }, include: { course: true } }),
    prisma.exam.findMany({
      where: { userId, date: { gte: now } },
      include: { course: true },
      orderBy: { date: "asc" },
      take: 5,
    }),
    prisma.studyPlan.findFirst({ where: { userId }, orderBy: { generatedAt: "desc" } }),
  ]);

  const pendingAssignments = assignments.filter((a) => a.status !== "COMPLETED");
  const completedAssignments = assignments.filter((a) => a.status === "COMPLETED");
  const upcomingAssignments = [...pendingAssignments]
    .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
    .slice(0, 5);

  const completionRate =
    assignments.length > 0 ? Math.round((completedAssignments.length / assignments.length) * 100) : 0;

  const totalStudyHours = pendingAssignments.reduce((sum, a) => sum + a.estimatedHours, 0);

  return {
    user,
    stats: {
      coursesCount: courses.length,
      pendingAssignmentsCount: pendingAssignments.length,
      completedAssignmentsCount: completedAssignments.length,
      upcomingExamsCount: upcomingExams.length,
      completionRate,
      totalStudyHours,
    },
    upcomingAssignments,
    upcomingExams,
    latestPlan,
  };
}

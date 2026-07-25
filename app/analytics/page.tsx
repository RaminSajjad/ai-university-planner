import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { CompletionPieChart, CourseProgressChart } from "@/components/analytics/analytics-charts";
import { Clock, CheckCircle2, CalendarClock } from "lucide-react";

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  const userId = session.user.id;

  const [courses, assignments, upcomingExams] = await Promise.all([
    prisma.course.findMany({ where: { userId }, include: { assignments: true } }),
    prisma.assignment.findMany({ where: { userId } }),
    prisma.exam.count({ where: { userId, date: { gte: new Date() } } }),
  ]);

  const completed = assignments.filter((a) => a.status === "COMPLETED");
  const pending = assignments.filter((a) => a.status !== "COMPLETED");
  const completionRate = assignments.length > 0 ? Math.round((completed.length / assignments.length) * 100) : 0;
  const avgStudyHours =
    assignments.length > 0
      ? (assignments.reduce((s, a) => s + a.estimatedHours, 0) / assignments.length).toFixed(1)
      : "0";

  const courseProgressData = courses.map((c) => ({
    courseName: c.courseName,
    assignmentsCompleted: c.assignments.filter((a) => a.status === "COMPLETED").length,
    assignmentsTotal: c.assignments.length,
  }));

  return (
    <AppShell userName={session.user?.name}>
      <div className="p-6 space-y-6">
        <h1 className="text-subheading font-semibold">Analytics</h1>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={Clock} label="Avg Study Hours / Task" value={avgStudyHours} accent="secondary" />
          <StatCard icon={CheckCircle2} label="Completion Rate" value={`${completionRate}%`} accent="success" />
          <StatCard icon={CalendarClock} label="Upcoming Exams" value={upcomingExams} accent="primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-card-title font-semibold mb-4">Assignment Completion</h3>
            <CompletionPieChart completed={completed.length} pending={pending.length} />
          </div>
          <div className="card">
            <h3 className="text-card-title font-semibold mb-4">Course Progress</h3>
            <CourseProgressChart data={courseProgressData} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}

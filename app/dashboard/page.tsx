import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BookOpen, ClipboardList, CalendarClock, TrendingUp, Clock } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { getDashboardData } from "@/actions/dashboard";
import { AppShell } from "@/components/layout/app-shell";
import { StatCard } from "@/components/dashboard/stat-card";
import { DashboardChart } from "@/components/dashboard/dashboard-chart";
import { daysUntil } from "@/lib/utils";
import type { StudyPlanOutput } from "@/lib/ai";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { user, stats, upcomingAssignments, upcomingExams, latestPlan } = await getDashboardData();

  return (
    <AppShell userName={session.user?.name}>
      <div className="p-6 space-y-6">
        <h1 className="text-subheading font-semibold">
          Welcome, {session.user?.name?.split(" ")[0]} 👋
        </h1>

        {/* Top stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={TrendingUp}
            label="Current CGPA"
            value={user?.cgpa ?? "Not set"}
            accent="success"
          />
          <StatCard
            icon={ClipboardList}
            label="Pending Assignments"
            value={stats.pendingAssignmentsCount}
            accent="warning"
          />
          <StatCard
            icon={CalendarClock}
            label="Upcoming Exams"
            value={stats.upcomingExamsCount}
            accent="primary"
          />
          <StatCard
            icon={Clock}
            label="Study Hours Needed"
            value={stats.totalStudyHours}
            accent="secondary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's plan preview */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-card-title font-semibold">Today&apos;s Study Plan</h3>
              <Link href="/planner" className="text-small text-primary hover:underline">
                View full plan
              </Link>
            </div>
            {latestPlan ? (
              <div className="space-y-3">
                {(latestPlan.plan as unknown as StudyPlanOutput).todayPlan.slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-small">
                    <span className="text-primary font-medium whitespace-nowrap">{item.time}</span>
                    <span className="text-slate-600 dark:text-slate-300">
                      {item.course} — {item.task}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-small text-slate-500 dark:text-slate-400">
                No study plan yet.{" "}
                <Link href="/planner" className="text-primary hover:underline">
                  Generate one
                </Link>
                .
              </p>
            )}
          </div>

          {/* Upcoming deadlines */}
          <div className="card">
            <h3 className="text-card-title font-semibold mb-4">Upcoming Deadlines</h3>
            {upcomingAssignments.length === 0 && upcomingExams.length === 0 ? (
              <p className="text-small text-slate-500 dark:text-slate-400">
                Nothing due soon. You&apos;re all caught up!
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingAssignments.slice(0, 3).map((a) => (
                  <div key={a.id} className="flex items-center justify-between text-small">
                    <span>{a.title}</span>
                    <span className="text-slate-500 dark:text-slate-400">{daysUntil(a.deadline)}</span>
                  </div>
                ))}
                {upcomingExams.slice(0, 2).map((e) => (
                  <div key={e.id} className="flex items-center justify-between text-small">
                    <span>
                      {e.examType} — {e.course.courseName}
                    </span>
                    <span className="text-danger font-medium">{daysUntil(e.date)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chart + quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardChart plan={latestPlan ? (latestPlan.plan as unknown as StudyPlanOutput) : null} />

          <div className="card">
            <h3 className="text-card-title font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/courses"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-100 dark:bg-slate-700 hover:opacity-80 transition text-small font-medium"
              >
                <BookOpen className="w-5 h-5 text-primary" />
                Add Course
              </Link>
              <Link
                href="/assignments"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-100 dark:bg-slate-700 hover:opacity-80 transition text-small font-medium"
              >
                <ClipboardList className="w-5 h-5 text-warning" />
                Add Assignment
              </Link>
              <Link
                href="/exams"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-100 dark:bg-slate-700 hover:opacity-80 transition text-small font-medium"
              >
                <CalendarClock className="w-5 h-5 text-danger" />
                Add Exam
              </Link>
              <Link
                href="/planner"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-100 dark:bg-slate-700 hover:opacity-80 transition text-small font-medium"
              >
                <TrendingUp className="w-5 h-5 text-secondary" />
                Generate Plan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

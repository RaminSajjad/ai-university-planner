import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getCourses } from "@/actions/courses";
import { getLatestStudyPlan } from "@/actions/planner";
import { PlannerClient } from "@/components/planner/planner-client";
import { AppShell } from "@/components/layout/app-shell";
import type { StudyPlanOutput } from "@/lib/ai";

export default async function PlannerPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const [courses, latestPlan] = await Promise.all([getCourses(), getLatestStudyPlan()]);

  return (
    <AppShell userName={session.user?.name}>
      <div className="p-6">
        <h1 className="text-subheading font-semibold mb-6">AI Study Planner</h1>
        <PlannerClient
          courses={courses}
          existingPlan={latestPlan ? (latestPlan.plan as unknown as StudyPlanOutput) : null}
        />
      </div>
    </AppShell>
  );
}

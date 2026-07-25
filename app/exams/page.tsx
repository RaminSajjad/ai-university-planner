import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getExams } from "@/actions/exams";
import { getCourses } from "@/actions/courses";
import { ExamsClient } from "@/components/exams/exams-client";
import { AppShell } from "@/components/layout/app-shell";

export default async function ExamsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const [exams, courses] = await Promise.all([getExams(), getCourses()]);

  return (
    <AppShell userName={session.user?.name}>
      <ExamsClient initialExams={exams} courses={courses} />
    </AppShell>
  );
}

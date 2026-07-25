import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getCourses } from "@/actions/courses";
import { CoursesClient } from "@/components/courses/courses-client";
import { AppShell } from "@/components/layout/app-shell";

export default async function CoursesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const courses = await getCourses();

  return (
    <AppShell userName={session.user?.name}>
      <CoursesClient initialCourses={courses} />
    </AppShell>
  );
}

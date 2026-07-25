import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getAssignments } from "@/actions/assignments";
import { getCourses } from "@/actions/courses";
import { AssignmentsClient } from "@/components/assignments/assignments-client";
import { AppShell } from "@/components/layout/app-shell";

export default async function AssignmentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const [assignments, courses] = await Promise.all([getAssignments(), getCourses()]);

  return (
    <AppShell userName={session.user?.name}>
      <AssignmentsClient initialAssignments={assignments} courses={courses} />
    </AppShell>
  );
}

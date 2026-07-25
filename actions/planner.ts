"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateStudyPlan, type StudyPlanOutput } from "@/lib/ai";
import { studyPlannerInputSchema } from "@/lib/validations";

async function requireUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("You must be logged in to do this");
  }
  return session.user.id;
}

export type PlannerState = {
  success: boolean;
  message: string;
  plan?: StudyPlanOutput;
};

export async function generatePlan(
  _prevState: PlannerState,
  formData: FormData
): Promise<PlannerState> {
  const userId = await requireUserId();

  const weakSubjectsRaw = formData.getAll("weakSubjects") as string[];

  const parsed = studyPlannerInputSchema.safeParse({
    availableHours: formData.get("availableHours"),
    preferredTime: formData.get("preferredTime"),
    weakSubjects: weakSubjectsRaw,
  });

  if (!parsed.success) {
    return { success: false, message: "Please check your inputs and try again" };
  }

  const [courses, assignments, exams] = await Promise.all([
    prisma.course.findMany({ where: { userId } }),
    prisma.assignment.findMany({
      where: { userId, status: { not: "COMPLETED" } },
      include: { course: true },
    }),
    prisma.exam.findMany({
      where: { userId, date: { gte: new Date() } },
      include: { course: true },
    }),
  ]);

  if (courses.length === 0) {
    return {
      success: false,
      message: "Add at least one course before generating a study plan",
    };
  }

  try {
    const plan = await generateStudyPlan({
      availableHours: parsed.data.availableHours,
      preferredTime: parsed.data.preferredTime,
      weakSubjects: parsed.data.weakSubjects ?? [],
      courses: courses.map((c) => ({
        courseName: c.courseName,
        courseCode: c.courseCode,
        currentGrade: c.currentGrade,
      })),
      assignments: assignments.map((a) => ({
        title: a.title,
        courseName: a.course.courseName,
        deadline: a.deadline.toISOString().slice(0, 10),
        difficulty: a.difficulty,
        estimatedHours: a.estimatedHours,
      })),
      exams: exams.map((e) => ({
        courseName: e.course.courseName,
        examType: e.examType,
        date: e.date.toISOString().slice(0, 10),
      })),
    });

    await prisma.studyPlan.create({
      data: { userId, plan: plan as object },
    });

    revalidatePath("/planner");
    return { success: true, message: "Study plan generated successfully", plan };
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to generate study plan";
    return { success: false, message: msg };
  }
}

export async function getLatestStudyPlan() {
  const userId = await requireUserId();
  const latest = await prisma.studyPlan.findFirst({
    where: { userId },
    orderBy: { generatedAt: "desc" },
  });
  return latest;
}

"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { assignmentSchema } from "@/lib/validations";

async function requireUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("You must be logged in to do this");
  }
  return session.user.id;
}

export type AssignmentState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

function extractRaw(formData: FormData) {
  return {
    title: formData.get("title"),
    courseId: formData.get("courseId"),
    description: formData.get("description") || undefined,
    deadline: formData.get("deadline"),
    difficulty: formData.get("difficulty"),
    estimatedHours: formData.get("estimatedHours"),
    notes: formData.get("notes") || undefined,
  };
}

export async function createAssignment(
  _prevState: AssignmentState,
  formData: FormData
): Promise<AssignmentState> {
  const userId = await requireUserId();
  const parsed = assignmentSchema.safeParse(extractRaw(formData));

  if (!parsed.success) {
    return { success: false, message: "Please fix the errors below", errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.assignment.create({
    data: { ...parsed.data, userId },
  });

  revalidatePath("/assignments");
  return { success: true, message: "Assignment added successfully" };
}

export async function updateAssignment(
  assignmentId: string,
  _prevState: AssignmentState,
  formData: FormData
): Promise<AssignmentState> {
  const userId = await requireUserId();
  const parsed = assignmentSchema.safeParse(extractRaw(formData));

  if (!parsed.success) {
    return { success: false, message: "Please fix the errors below", errors: parsed.error.flatten().fieldErrors };
  }

  const assignment = await prisma.assignment.findUnique({ where: { id: assignmentId } });
  if (!assignment || assignment.userId !== userId) {
    return { success: false, message: "Assignment not found" };
  }

  await prisma.assignment.update({
    where: { id: assignmentId },
    data: parsed.data,
  });

  revalidatePath("/assignments");
  return { success: true, message: "Assignment updated successfully" };
}

export async function deleteAssignment(assignmentId: string) {
  const userId = await requireUserId();

  const assignment = await prisma.assignment.findUnique({ where: { id: assignmentId } });
  if (!assignment || assignment.userId !== userId) {
    throw new Error("Assignment not found");
  }

  await prisma.assignment.delete({ where: { id: assignmentId } });
  revalidatePath("/assignments");
}

export async function toggleAssignmentComplete(assignmentId: string, currentStatus: string) {
  const userId = await requireUserId();

  const assignment = await prisma.assignment.findUnique({ where: { id: assignmentId } });
  if (!assignment || assignment.userId !== userId) {
    throw new Error("Assignment not found");
  }

  await prisma.assignment.update({
    where: { id: assignmentId },
    data: { status: currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED" },
  });

  revalidatePath("/assignments");
}

export async function getAssignments() {
  const userId = await requireUserId();
  return prisma.assignment.findMany({
    where: { userId },
    include: { course: true },
    orderBy: { deadline: "asc" },
  });
}

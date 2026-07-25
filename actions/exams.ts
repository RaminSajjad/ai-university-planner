"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { examSchema } from "@/lib/validations";

async function requireUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("You must be logged in to do this");
  }
  return session.user.id;
}

export type ExamState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

function extractRaw(formData: FormData) {
  return {
    courseId: formData.get("courseId"),
    examType: formData.get("examType"),
    date: formData.get("date"),
    time: formData.get("time"),
    location: formData.get("location") || undefined,
    notes: formData.get("notes") || undefined,
  };
}

export async function createExam(
  _prevState: ExamState,
  formData: FormData
): Promise<ExamState> {
  const userId = await requireUserId();
  const parsed = examSchema.safeParse(extractRaw(formData));

  if (!parsed.success) {
    return { success: false, message: "Please fix the errors below", errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.exam.create({
    data: { ...parsed.data, userId },
  });

  revalidatePath("/exams");
  return { success: true, message: "Exam added successfully" };
}

export async function updateExam(
  examId: string,
  _prevState: ExamState,
  formData: FormData
): Promise<ExamState> {
  const userId = await requireUserId();
  const parsed = examSchema.safeParse(extractRaw(formData));

  if (!parsed.success) {
    return { success: false, message: "Please fix the errors below", errors: parsed.error.flatten().fieldErrors };
  }

  const exam = await prisma.exam.findUnique({ where: { id: examId } });
  if (!exam || exam.userId !== userId) {
    return { success: false, message: "Exam not found" };
  }

  await prisma.exam.update({
    where: { id: examId },
    data: parsed.data,
  });

  revalidatePath("/exams");
  return { success: true, message: "Exam updated successfully" };
}

export async function deleteExam(examId: string) {
  const userId = await requireUserId();

  const exam = await prisma.exam.findUnique({ where: { id: examId } });
  if (!exam || exam.userId !== userId) {
    throw new Error("Exam not found");
  }

  await prisma.exam.delete({ where: { id: examId } });
  revalidatePath("/exams");
}

export async function getExams() {
  const userId = await requireUserId();
  return prisma.exam.findMany({
    where: { userId },
    include: { course: true },
    orderBy: { date: "asc" },
  });
}

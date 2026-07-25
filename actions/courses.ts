"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { courseSchema } from "@/lib/validations";

async function requireUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("You must be logged in to do this");
  }
  return session.user.id;
}

export type CourseState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function createCourse(
  _prevState: CourseState,
  formData: FormData
): Promise<CourseState> {
  const userId = await requireUserId();

  const raw = {
    courseName: formData.get("courseName"),
    courseCode: formData.get("courseCode"),
    creditHours: formData.get("creditHours"),
    instructor: formData.get("instructor") || undefined,
    semester: formData.get("semester") || undefined,
    currentGrade: formData.get("currentGrade") || undefined,
  };

  const parsed = courseSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: "Please fix the errors below", errors: parsed.error.flatten().fieldErrors };
  }

  await prisma.course.create({
    data: { ...parsed.data, userId },
  });

  revalidatePath("/courses");
  return { success: true, message: "Course added successfully" };
}

export async function updateCourse(
  courseId: string,
  _prevState: CourseState,
  formData: FormData
): Promise<CourseState> {
  const userId = await requireUserId();

  const raw = {
    courseName: formData.get("courseName"),
    courseCode: formData.get("courseCode"),
    creditHours: formData.get("creditHours"),
    instructor: formData.get("instructor") || undefined,
    semester: formData.get("semester") || undefined,
    currentGrade: formData.get("currentGrade") || undefined,
  };

  const parsed = courseSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: "Please fix the errors below", errors: parsed.error.flatten().fieldErrors };
  }

  // Ensure the course belongs to this user before updating
  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course || course.userId !== userId) {
    return { success: false, message: "Course not found" };
  }

  await prisma.course.update({
    where: { id: courseId },
    data: parsed.data,
  });

  revalidatePath("/courses");
  return { success: true, message: "Course updated successfully" };
}

export async function deleteCourse(courseId: string) {
  const userId = await requireUserId();

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course || course.userId !== userId) {
    throw new Error("Course not found");
  }

  await prisma.course.delete({ where: { id: courseId } });
  revalidatePath("/courses");
}

export async function getCourses() {
  const userId = await requireUserId();
  return prisma.course.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

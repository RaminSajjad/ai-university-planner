"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { changePasswordSchema } from "@/lib/validations";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  university: z.string().optional(),
  department: z.string().optional(),
  semester: z.string().optional(),
  cgpa: z.coerce.number().min(0).max(4).optional().or(z.literal("").transform(() => undefined)),
  targetCgpa: z.coerce.number().min(0).max(4).optional().or(z.literal("").transform(() => undefined)),
});

export type ProfileState = {
  success: boolean;
  message: string;
};

async function requireUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("You must be logged in to do this");
  return session.user.id;
}

export async function updateProfile(
  _prevState: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const userId = await requireUserId();

  const raw = {
    name: formData.get("name"),
    university: formData.get("university") || undefined,
    department: formData.get("department") || undefined,
    semester: formData.get("semester") || undefined,
    cgpa: formData.get("cgpa") || "",
    targetCgpa: formData.get("targetCgpa") || "",
  };

  const parsed = profileSchema.safeParse(raw);
  if (!parsed.success) {
    return { success: false, message: "Please check your inputs" };
  }

  await prisma.user.update({
    where: { id: userId },
    data: parsed.data,
  });

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  return { success: true, message: "Profile updated successfully" };
}

export async function getProfile() {
  const userId = await requireUserId();
  return prisma.user.findUnique({ where: { id: userId } });
}

export type ChangePasswordState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function changePassword(
  _prevState: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const userId = await requireUserId();

  const parsed = changePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmNewPassword: formData.get("confirmNewPassword"),
  });

  if (!parsed.success) {
    return { success: false, message: "Please fix the errors below", errors: parsed.error.flatten().fieldErrors };
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return { success: false, message: "User not found" };
  }

  const isCurrentValid = await bcrypt.compare(parsed.data.currentPassword, user.password);
  if (!isCurrentValid) {
    return {
      success: false,
      message: "Current password is incorrect",
      errors: { currentPassword: ["Current password is incorrect"] },
    };
  }

  const hashedNewPassword = await bcrypt.hash(parsed.data.newPassword, 10);
  await prisma.user.update({ where: { id: userId }, data: { password: hashedNewPassword } });

  return { success: true, message: "Password changed successfully" };
}

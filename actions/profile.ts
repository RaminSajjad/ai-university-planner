"use server";

import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

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

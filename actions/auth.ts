"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/lib/validations";

export type RegisterState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    university: formData.get("university") || undefined,
    department: formData.get("department") || undefined,
    semester: formData.get("semester") || undefined,
  };

  const parsed = registerSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, university, department, semester } = parsed.data;

  // Check if a user with this email already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists",
      errors: { email: ["Email is already registered"] },
    };
  }

  // Hash the password before storing it — never store plain text passwords
  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      university,
      department,
      semester,
    },
  });

  return {
    success: true,
    message: "Account created successfully! You can now log in.",
  };
}

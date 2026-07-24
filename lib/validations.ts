import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    university: z.string().optional(),
    department: z.string().optional(),
    semester: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const courseSchema = z.object({
  courseName: z.string().min(1, "Course name is required"),
  courseCode: z.string().min(1, "Course code is required"),
  creditHours: z.coerce.number().min(1, "Credit hours must be greater than 0"),
  instructor: z.string().optional(),
  semester: z.string().optional(),
  currentGrade: z.string().optional(),
});

export const assignmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  courseId: z.string().min(1, "Course is required"),
  description: z.string().optional(),
  deadline: z.coerce.date({ required_error: "Deadline is required" }),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  estimatedHours: z.coerce.number().min(0.5, "Estimate at least 0.5 hours"),
  notes: z.string().optional(),
});

export const examSchema = z.object({
  courseId: z.string().min(1, "Course is required"),
  examType: z.string().min(1, "Exam type is required"),
  date: z.coerce.date({ required_error: "Date is required" }),
  time: z.string().min(1, "Time is required"),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export const studyPlannerInputSchema = z.object({
  availableHours: z.coerce.number().min(1).max(24),
  preferredTime: z.enum(["MORNING", "AFTERNOON", "EVENING", "NIGHT"]),
  weakSubjects: z.array(z.string()).optional(),
});

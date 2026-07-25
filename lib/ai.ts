import { z } from "zod";

// Schema for what we ask the AI to return — keeps the output predictable
// so we can safely render it in the UI.
const studyPlanSchema = z.object({
  todayPlan: z.array(
    z.object({
      time: z.string(),
      course: z.string(),
      task: z.string(),
      reason: z.string(),
      priority: z.enum(["High", "Medium", "Low"]),
    })
  ),
  weeklyPlan: z.array(
    z.object({
      day: z.string(),
      focus: z.string(),
      hours: z.number(),
      reason: z.string(),
    })
  ),
  tips: z.array(z.string()),
});

export type StudyPlanOutput = z.infer<typeof studyPlanSchema>;

export type PlannerInput = {
  availableHours: number;
  preferredTime: string;
  weakSubjects: string[];
  courses: { courseName: string; courseCode: string; currentGrade: string | null }[];
  assignments: {
    title: string;
    courseName: string;
    deadline: string;
    difficulty: string;
    estimatedHours: number;
  }[];
  exams: { courseName: string; examType: string; date: string }[];
};

const SYSTEM_PROMPT = `You are the AI Study Planner inside a university planning app.

Rules you must always follow:
- Prioritize the nearest deadlines first.
- Prioritize difficult courses and subjects the student marked as weak.
- Balance the plan within the student's available study hours — never exceed them.
- Prioritize courses with upcoming exams.
- NEVER invent assignments, exams, or courses that were not given to you in the data. Only use what's provided.
- Briefly explain the reason behind each recommendation.
- Today's date is provided in the data — use it to calculate urgency.

Respond with ONLY valid JSON matching this exact shape, and nothing else (no markdown fences, no preamble):
{
  "todayPlan": [{ "time": string, "course": string, "task": string, "reason": string, "priority": "High" | "Medium" | "Low" }],
  "weeklyPlan": [{ "day": string, "focus": string, "hours": number, "reason": string }],
  "tips": [string]
}`;

export async function generateStudyPlan(input: PlannerInput): Promise<StudyPlanOutput> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set. Add it to your .env file.");
  }

  const userPrompt = `Today's date: ${new Date().toISOString().slice(0, 10)}

Student's available study hours today: ${input.availableHours}
Preferred study time: ${input.preferredTime}
Subjects the student finds weak: ${input.weakSubjects.length ? input.weakSubjects.join(", ") : "none specified"}

Courses:
${input.courses.map((c) => `- ${c.courseName} (${c.courseCode})${c.currentGrade ? `, current grade: ${c.currentGrade}` : ""}`).join("\n") || "None"}

Pending assignments:
${input.assignments.map((a) => `- "${a.title}" for ${a.courseName}, deadline: ${a.deadline}, difficulty: ${a.difficulty}, estimated hours: ${a.estimatedHours}`).join("\n") || "None"}

Upcoming exams:
${input.exams.map((e) => `- ${e.examType} for ${e.courseName} on ${e.date}`).join("\n") || "None"}

Generate today's study plan and a weekly plan following the rules.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.4,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const rawContent = data.choices?.[0]?.message?.content;

  if (!rawContent) {
    throw new Error("AI did not return any content");
  }

  let parsedJson: unknown;
  try {
    parsedJson = JSON.parse(rawContent);
  } catch {
    throw new Error("AI response was not valid JSON");
  }

  const validated = studyPlanSchema.safeParse(parsedJson);
  if (!validated.success) {
    throw new Error("AI response did not match the expected format");
  }

  return validated.data;
}

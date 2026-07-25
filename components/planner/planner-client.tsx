"use client";

import { useActionState, useEffect, useState } from "react";
import { Brain, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { Course } from "@prisma/client";
import { generatePlan, type PlannerState } from "@/actions/planner";
import { PlanResult } from "./plan-result";
import type { StudyPlanOutput } from "@/lib/ai";

const plannerInitialState: PlannerState = { success: false, message: "" };

export function PlannerClient({
  courses,
  existingPlan,
}: {
  courses: Course[];
  existingPlan: StudyPlanOutput | null;
}) {
  const [state, formAction, isPending] = useActionState(generatePlan, plannerInitialState);
  const [displayedPlan, setDisplayedPlan] = useState<StudyPlanOutput | null>(existingPlan);

  useEffect(() => {
    if (state.message && state.success && state.plan) {
      toast.success(state.message);
      setDisplayedPlan(state.plan);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  if (courses.length === 0) {
    return (
      <div className="card text-center py-12">
        <Brain className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-body font-medium mb-1">Add a course first</p>
        <p className="text-small text-slate-500 dark:text-slate-400">
          The AI needs at least one course to generate a study plan from your real data.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Input form */}
      <div className="card lg:col-span-1 h-fit">
        <h2 className="text-card-title font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Plan My Study
        </h2>
        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-small font-medium block mb-1">Available Study Hours Today</label>
            <input
              name="availableHours"
              type="number"
              min="1"
              max="24"
              step="0.5"
              defaultValue={4}
              required
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-small font-medium block mb-1">Preferred Study Time</label>
            <select
              name="preferredTime"
              defaultValue="MORNING"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="MORNING">Morning</option>
              <option value="AFTERNOON">Afternoon</option>
              <option value="EVENING">Evening</option>
              <option value="NIGHT">Night</option>
            </select>
          </div>

          <div>
            <label className="text-small font-medium block mb-2">Weak Subjects (optional)</label>
            <div className="space-y-2">
              {courses.map((c) => (
                <label key={c.id} className="flex items-center gap-2 text-small">
                  <input type="checkbox" name="weakSubjects" value={c.courseName} className="rounded" />
                  {c.courseName}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            {isPending ? "Generating plan..." : "Generate Plan"}
          </button>
        </form>
      </div>

      {/* Result */}
      <div className="lg:col-span-2">
        {isPending ? (
          <div className="card text-center py-16">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-3 animate-pulse" />
            <p className="text-body text-slate-500 dark:text-slate-400">
              Analyzing your courses, assignments, and exams...
            </p>
          </div>
        ) : displayedPlan ? (
          <PlanResult plan={displayedPlan} />
        ) : (
          <div className="card text-center py-16">
            <Brain className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-body text-slate-500 dark:text-slate-400">
              Fill in the form and generate your first AI study plan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

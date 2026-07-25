"use client";

import { useActionState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createAssignment, updateAssignment, type AssignmentState } from "@/actions/assignments";
import type { Assignment, Course } from "@prisma/client";

const initialState: AssignmentState = { success: false, message: "" };

function toDateInputValue(date?: Date | string) {
  if (!date) return "";
  const d = new Date(date);
  return d.toISOString().slice(0, 10);
}

export function AssignmentModal({
  open,
  onClose,
  assignment,
  courses,
}: {
  open: boolean;
  onClose: () => void;
  assignment?: Assignment | null;
  courses: Course[];
}) {
  const isEditing = !!assignment;
  const action = isEditing ? updateAssignment.bind(null, assignment!.id) : createAssignment;
  const [state, formAction, isPending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message && state.success) {
      toast.success(state.message);
      onClose();
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in px-4 overflow-y-auto py-8">
      <div className="card w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-card-title font-semibold mb-6">
          {isEditing ? "Edit Assignment" : "Add Assignment"}
        </h2>

        {courses.length === 0 ? (
          <p className="text-small text-slate-500 dark:text-slate-400">
            You need to add a course first before creating assignments.
          </p>
        ) : (
          <form action={formAction} className="space-y-4">
            <div>
              <label className="text-small font-medium block mb-1">Title</label>
              <input
                name="title"
                defaultValue={assignment?.title}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {state.errors?.title && <p className="text-danger text-small mt-1">{state.errors.title[0]}</p>}
            </div>

            <div>
              <label className="text-small font-medium block mb-1">Course</label>
              <select
                name="courseId"
                defaultValue={assignment?.courseId ?? ""}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="" disabled>Select a course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.courseName} ({c.courseCode})</option>
                ))}
              </select>
              {state.errors?.courseId && <p className="text-danger text-small mt-1">{state.errors.courseId[0]}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-small font-medium block mb-1">Deadline</label>
                <input
                  name="deadline"
                  type="date"
                  defaultValue={toDateInputValue(assignment?.deadline)}
                  required
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {state.errors?.deadline && <p className="text-danger text-small mt-1">{state.errors.deadline[0]}</p>}
              </div>
              <div>
                <label className="text-small font-medium block mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  defaultValue={assignment?.difficulty ?? "MEDIUM"}
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-small font-medium block mb-1">Estimated Study Hours</label>
              <input
                name="estimatedHours"
                type="number"
                step="0.5"
                min="0.5"
                defaultValue={assignment?.estimatedHours ?? 1}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {state.errors?.estimatedHours && (
                <p className="text-danger text-small mt-1">{state.errors.estimatedHours[0]}</p>
              )}
            </div>

            <div>
              <label className="text-small font-medium block mb-1">Notes</label>
              <textarea
                name="notes"
                defaultValue={assignment?.notes ?? ""}
                rows={2}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {isPending ? "Saving..." : isEditing ? "Save Changes" : "Add Assignment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

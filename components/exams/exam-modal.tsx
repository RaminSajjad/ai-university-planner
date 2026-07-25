"use client";

import { useActionState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createExam, updateExam, type ExamState } from "@/actions/exams";
import type { Exam, Course } from "@prisma/client";

const initialState: ExamState = { success: false, message: "" };

function toDateInputValue(date?: Date | string) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export function ExamModal({
  open,
  onClose,
  exam,
  courses,
}: {
  open: boolean;
  onClose: () => void;
  exam?: Exam | null;
  courses: Course[];
}) {
  const isEditing = !!exam;
  const action = isEditing ? updateExam.bind(null, exam!.id) : createExam;
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

        <h2 className="text-card-title font-semibold mb-6">{isEditing ? "Edit Exam" : "Add Exam"}</h2>

        {courses.length === 0 ? (
          <p className="text-small text-slate-500 dark:text-slate-400">
            You need to add a course first before creating exams.
          </p>
        ) : (
          <form action={formAction} className="space-y-4">
            <div>
              <label className="text-small font-medium block mb-1">Course</label>
              <select
                name="courseId"
                defaultValue={exam?.courseId ?? ""}
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

            <div>
              <label className="text-small font-medium block mb-1">Exam Type</label>
              <input
                name="examType"
                defaultValue={exam?.examType}
                placeholder="e.g. Midterm, Final, Quiz"
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {state.errors?.examType && <p className="text-danger text-small mt-1">{state.errors.examType[0]}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-small font-medium block mb-1">Date</label>
                <input
                  name="date"
                  type="date"
                  defaultValue={toDateInputValue(exam?.date)}
                  required
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {state.errors?.date && <p className="text-danger text-small mt-1">{state.errors.date[0]}</p>}
              </div>
              <div>
                <label className="text-small font-medium block mb-1">Time</label>
                <input
                  name="time"
                  type="time"
                  defaultValue={exam?.time}
                  required
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {state.errors?.time && <p className="text-danger text-small mt-1">{state.errors.time[0]}</p>}
              </div>
            </div>

            <div>
              <label className="text-small font-medium block mb-1">Location</label>
              <input
                name="location"
                defaultValue={exam?.location ?? ""}
                placeholder="e.g. Room 204"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-small font-medium block mb-1">Notes</label>
              <textarea
                name="notes"
                defaultValue={exam?.notes ?? ""}
                rows={2}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {isPending ? "Saving..." : isEditing ? "Save Changes" : "Add Exam"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

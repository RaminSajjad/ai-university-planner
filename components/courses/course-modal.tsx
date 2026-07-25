"use client";

import { useActionState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createCourse, updateCourse, type CourseState } from "@/actions/courses";
import type { Course } from "@prisma/client";

const initialState: CourseState = { success: false, message: "" };

export function CourseModal({
  open,
  onClose,
  course,
}: {
  open: boolean;
  onClose: () => void;
  course?: Course | null;
}) {
  const isEditing = !!course;
  const action = isEditing ? updateCourse.bind(null, course!.id) : createCourse;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in px-4">
      <div className="card w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-card-title font-semibold mb-6">
          {isEditing ? "Edit Course" : "Add Course"}
        </h2>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="text-small font-medium block mb-1">Course Name</label>
            <input
              name="courseName"
              defaultValue={course?.courseName}
              required
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {state.errors?.courseName && (
              <p className="text-danger text-small mt-1">{state.errors.courseName[0]}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-small font-medium block mb-1">Course Code</label>
              <input
                name="courseCode"
                defaultValue={course?.courseCode}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {state.errors?.courseCode && (
                <p className="text-danger text-small mt-1">{state.errors.courseCode[0]}</p>
              )}
            </div>
            <div>
              <label className="text-small font-medium block mb-1">Credit Hours</label>
              <input
                name="creditHours"
                type="number"
                min="1"
                defaultValue={course?.creditHours}
                required
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {state.errors?.creditHours && (
                <p className="text-danger text-small mt-1">{state.errors.creditHours[0]}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-small font-medium block mb-1">Instructor</label>
            <input
              name="instructor"
              defaultValue={course?.instructor ?? ""}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-small font-medium block mb-1">Semester</label>
              <input
                name="semester"
                defaultValue={course?.semester ?? ""}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="text-small font-medium block mb-1">Current Grade</label>
              <input
                name="currentGrade"
                defaultValue={course?.currentGrade ?? ""}
                placeholder="e.g. A, B+"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            {isPending ? "Saving..." : isEditing ? "Save Changes" : "Add Course"}
          </button>
        </form>
      </div>
    </div>
  );
}

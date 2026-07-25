"use client";

import { Pencil, Trash2, CheckCircle2, Circle } from "lucide-react";
import { daysUntil, formatDate } from "@/lib/utils";
import type { Assignment, Course } from "@prisma/client";

const difficultyColor: Record<string, string> = {
  EASY: "bg-success/10 text-success",
  MEDIUM: "bg-warning/10 text-warning",
  HARD: "bg-danger/10 text-danger",
};

export function AssignmentCard({
  assignment,
  onEdit,
  onDelete,
  onToggle,
}: {
  assignment: Assignment & { course: Course };
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  const isCompleted = assignment.status === "COMPLETED";

  return (
    <div className={`card transition ${isCompleted ? "opacity-60" : "hover:shadow-md"}`}>
      <div className="flex items-start justify-between mb-2">
        <button onClick={onToggle} aria-label="Toggle complete">
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-success" />
          ) : (
            <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
          )}
        </button>
        <div className="flex gap-2">
          <button onClick={onEdit} className="text-slate-400 hover:text-primary transition" aria-label="Edit">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="text-slate-400 hover:text-danger transition" aria-label="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className={`text-card-title font-semibold ${isCompleted ? "line-through" : ""}`}>
        {assignment.title}
      </h3>
      <p className="text-small text-slate-500 dark:text-slate-400 mb-3">
        {assignment.course.courseName} ({assignment.course.courseCode})
      </p>

      <div className="flex flex-wrap gap-2 text-small">
        <span className={`px-2 py-1 rounded-md font-medium ${difficultyColor[assignment.difficulty]}`}>
          {assignment.difficulty}
        </span>
        <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700">
          {formatDate(assignment.deadline)}
        </span>
        {!isCompleted && (
          <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700">
            {daysUntil(assignment.deadline)}
          </span>
        )}
      </div>
    </div>
  );
}

"use client";

import { Pencil, Trash2, MapPin, Clock } from "lucide-react";
import { daysUntil, formatDate } from "@/lib/utils";
import type { Exam, Course } from "@prisma/client";

export function ExamCard({
  exam,
  onEdit,
  onDelete,
}: {
  exam: Exam & { course: Course };
  onEdit: () => void;
  onDelete: () => void;
}) {
  const countdown = daysUntil(exam.date);
  const daysLeft = new Date(exam.date).getTime() - Date.now();
  const isSoon = daysLeft >= 0 && daysLeft <= 3 * 24 * 60 * 60 * 1000;

  return (
    <div className="card hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <span className="px-2 py-1 rounded-md bg-secondary/10 text-secondary text-small font-medium">
          {exam.examType}
        </span>
        <div className="flex gap-2">
          <button onClick={onEdit} className="text-slate-400 hover:text-primary transition" aria-label="Edit">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="text-slate-400 hover:text-danger transition" aria-label="Delete">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-card-title font-semibold">{exam.course.courseName}</h3>
      <p className="text-small text-slate-500 dark:text-slate-400 mb-3">{exam.course.courseCode}</p>

      <div className="flex flex-wrap gap-2 text-small mb-2">
        <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatDate(exam.date)} · {exam.time}
        </span>
        {exam.location && (
          <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {exam.location}
          </span>
        )}
      </div>

      <span
        className={`inline-block px-2 py-1 rounded-md text-small font-medium ${
          isSoon ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary"
        }`}
      >
        {countdown}
      </span>
    </div>
  );
}

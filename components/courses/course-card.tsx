"use client";

import { Pencil, Trash2, BookOpen } from "lucide-react";
import type { Course } from "@prisma/client";

export function CourseCard({
  course,
  onEdit,
  onDelete,
}: {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="card hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="text-slate-400 hover:text-primary transition"
            aria-label="Edit course"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="text-slate-400 hover:text-danger transition"
            aria-label="Delete course"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h3 className="text-card-title font-semibold">{course.courseName}</h3>
      <p className="text-small text-slate-500 dark:text-slate-400 mb-3">{course.courseCode}</p>

      <div className="flex flex-wrap gap-2 text-small">
        <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700">
          {course.creditHours} credit hrs
        </span>
        {course.instructor && (
          <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700">
            {course.instructor}
          </span>
        )}
        {course.currentGrade && (
          <span className="px-2 py-1 rounded-md bg-success/10 text-success font-medium">
            {course.currentGrade}
          </span>
        )}
      </div>
    </div>
  );
}

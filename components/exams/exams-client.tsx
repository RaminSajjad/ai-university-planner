"use client";

import { useState } from "react";
import { Plus, CalendarClock } from "lucide-react";
import { toast } from "sonner";
import type { Exam, Course } from "@prisma/client";
import { ExamCard } from "./exam-card";
import { ExamModal } from "./exam-modal";
import { EmptyState } from "@/components/ui/empty-state";
import { deleteExam } from "@/actions/exams";

type ExamWithCourse = Exam & { course: Course };

export function ExamsClient({
  initialExams,
  courses,
}: {
  initialExams: ExamWithCourse[];
  courses: Course[];
}) {
  const [exams, setExams] = useState(initialExams);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Exam | null>(null);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(e: Exam) {
    setEditing(e);
    setModalOpen(true);
  }

  async function handleDelete(e: Exam) {
    if (!window.confirm(`Delete this ${e.examType}? This cannot be undone.`)) return;
    const previous = exams;
    setExams((list) => list.filter((x) => x.id !== e.id));
    try {
      await deleteExam(e.id);
      toast.success("Exam deleted");
    } catch {
      setExams(previous);
      toast.error("Failed to delete exam");
    }
  }

  function handleModalClose() {
    setModalOpen(false);
    window.location.reload();
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-subheading font-semibold">Exams</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Add Exam
        </button>
      </div>

      {exams.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="No Exams Yet"
          actionLabel="Add Your First Exam"
          onAction={openAdd}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((e) => (
            <ExamCard key={e.id} exam={e} onEdit={() => openEdit(e)} onDelete={() => handleDelete(e)} />
          ))}
        </div>
      )}

      <ExamModal open={modalOpen} onClose={handleModalClose} exam={editing} courses={courses} />
    </div>
  );
}

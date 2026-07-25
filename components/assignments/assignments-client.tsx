"use client";

import { useState, useMemo } from "react";
import { Plus, Search, ClipboardList } from "lucide-react";
import { toast } from "sonner";
import type { Assignment, Course } from "@prisma/client";
import { AssignmentCard } from "./assignment-card";
import { AssignmentModal } from "./assignment-modal";
import { EmptyState } from "@/components/ui/empty-state";
import { deleteAssignment, toggleAssignmentComplete } from "@/actions/assignments";

type AssignmentWithCourse = Assignment & { course: Course };

export function AssignmentsClient({
  initialAssignments,
  courses,
}: {
  initialAssignments: AssignmentWithCourse[];
  courses: Course[];
}) {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PENDING" | "COMPLETED">("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Assignment | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return assignments.filter((a) => {
      const matchesSearch =
        a.title.toLowerCase().includes(q) || a.course.courseName.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "ALL" ||
        (statusFilter === "COMPLETED" ? a.status === "COMPLETED" : a.status !== "COMPLETED");
      return matchesSearch && matchesStatus;
    });
  }, [assignments, search, statusFilter]);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(a: Assignment) {
    setEditing(a);
    setModalOpen(true);
  }

  async function handleDelete(a: Assignment) {
    if (!window.confirm(`Delete "${a.title}"? This cannot be undone.`)) return;
    const previous = assignments;
    setAssignments((list) => list.filter((x) => x.id !== a.id));
    try {
      await deleteAssignment(a.id);
      toast.success("Assignment deleted");
    } catch {
      setAssignments(previous);
      toast.error("Failed to delete assignment");
    }
  }

  async function handleToggle(a: Assignment) {
    setAssignments((list) =>
      list.map((x) =>
        x.id === a.id ? { ...x, status: x.status === "COMPLETED" ? "PENDING" : "COMPLETED" } : x
      )
    );
    try {
      await toggleAssignmentComplete(a.id, a.status);
    } catch {
      toast.error("Failed to update status");
    }
  }

  function handleModalClose() {
    setModalOpen(false);
    window.location.reload();
  }

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-subheading font-semibold">Assignments</h1>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search assignments..."
              className="pl-9 pr-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-body focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent text-body focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Assignment
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title={assignments.length === 0 ? "No Assignments Yet" : "No assignments match your filters"}
          actionLabel="Add Your First Assignment"
          onAction={openAdd}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((a) => (
            <AssignmentCard
              key={a.id}
              assignment={a}
              onEdit={() => openEdit(a)}
              onDelete={() => handleDelete(a)}
              onToggle={() => handleToggle(a)}
            />
          ))}
        </div>
      )}

      <AssignmentModal open={modalOpen} onClose={handleModalClose} assignment={editing} courses={courses} />
    </div>
  );
}

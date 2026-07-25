"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateProfile, type ProfileState } from "@/actions/profile";
import type { User } from "@prisma/client";

const initialState: ProfileState = { success: false, message: "" };

export function ProfileForm({ user }: { user: User }) {
  const [state, formAction, isPending] = useActionState(updateProfile, initialState);

  useEffect(() => {
    if (state.message) {
      state.success ? toast.success(state.message) : toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4 max-w-lg">
      <div className="flex items-center gap-4 mb-2">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-semibold">
          {user.name[0]?.toUpperCase()}
        </div>
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-small text-slate-500 dark:text-slate-400">{user.email}</p>
        </div>
      </div>

      <div>
        <label className="text-small font-medium block mb-1">Name</label>
        <input
          name="name"
          defaultValue={user.name}
          required
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-small font-medium block mb-1">University</label>
          <input
            name="university"
            defaultValue={user.university ?? ""}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-small font-medium block mb-1">Department</label>
          <input
            name="department"
            defaultValue={user.department ?? ""}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-small font-medium block mb-1">Semester</label>
          <input
            name="semester"
            defaultValue={user.semester ?? ""}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-small font-medium block mb-1">CGPA</label>
          <input
            name="cgpa"
            type="number"
            step="0.01"
            min="0"
            max="4"
            defaultValue={user.cgpa ?? ""}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="text-small font-medium block mb-1">Target CGPA</label>
          <input
            name="targetCgpa"
            type="number"
            step="0.01"
            min="0"
            max="4"
            defaultValue={user.targetCgpa ?? ""}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-primary text-primary-foreground px-5 py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

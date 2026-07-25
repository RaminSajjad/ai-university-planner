"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { changePassword, type ChangePasswordState } from "@/actions/profile";

const initialState: ChangePasswordState = { success: false, message: "" };

export function PasswordForm() {
  const [state, formAction, isPending] = useActionState(changePassword, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.success) {
      toast.success(state.message);
      formRef.current?.reset();
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <div>
        <label className="text-small font-medium block mb-1">Current Password</label>
        <input
          name="currentPassword"
          type="password"
          required
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {state.errors?.currentPassword && (
          <p className="text-danger text-small mt-1">{state.errors.currentPassword[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-small font-medium block mb-1">New Password</label>
          <input
            name="newPassword"
            type="password"
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {state.errors?.newPassword && (
            <p className="text-danger text-small mt-1">{state.errors.newPassword[0]}</p>
          )}
        </div>
        <div>
          <label className="text-small font-medium block mb-1">Confirm New Password</label>
          <input
            name="confirmNewPassword"
            type="password"
            required
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {state.errors?.confirmNewPassword && (
            <p className="text-danger text-small mt-1">{state.errors.confirmNewPassword[0]}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-xl bg-primary text-primary-foreground px-5 py-2 text-small font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {isPending ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}

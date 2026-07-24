"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { registerUser, type RegisterState } from "@/actions/auth";

const fields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm Password", type: "password" },
  { name: "university", label: "University", type: "text" },
  { name: "department", label: "Department", type: "text" },
  { name: "semester", label: "Semester", type: "text" },
];

const initialState: RegisterState = { success: false, message: "" };

export function RegisterForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerUser, initialState);

  useEffect(() => {
    if (state.message && state.success) {
      toast.success(state.message);
      router.push("/login");
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="space-y-4">
      {fields.map((f) => (
        <div key={f.name}>
          <label className="text-small font-medium block mb-1">{f.label}</label>
          <input
            type={f.type}
            name={f.name}
            required={["name", "email", "password", "confirmPassword"].includes(f.name)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {state.errors?.[f.name] && (
            <p className="text-danger text-small mt-1">{state.errors[f.name][0]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {isPending ? "Creating account..." : "Register"}
      </button>

      <p className="text-small text-center mt-6 text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}

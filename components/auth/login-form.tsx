"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsPending(false);

    if (result?.error) {
      toast.error(result.error === "CredentialsSignin" ? "Invalid email or password" : result.error);
      return;
    }

    toast.success("Welcome back!");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-small font-medium block mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          placeholder="you@university.edu"
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div>
        <label className="text-small font-medium block mb-1">Password</label>
        <input
          type="password"
          name="password"
          required
          placeholder="••••••••"
          className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 text-body focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex items-center justify-between text-small">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          Remember Me
        </label>
        <Link href="/forgot-password" className="text-primary hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-primary text-primary-foreground py-2.5 font-medium hover:opacity-90 transition disabled:opacity-50"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      <p className="text-small text-center mt-6 text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}

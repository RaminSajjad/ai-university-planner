"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-danger/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-danger" />
      </div>
      <h1 className="text-heading font-bold mb-2">Something went wrong</h1>
      <p className="text-body text-slate-500 dark:text-slate-400 mb-8">
        An unexpected error occurred. You can try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
      >
        Try Again
      </button>
    </main>
  );
}

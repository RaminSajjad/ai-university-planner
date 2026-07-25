import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark px-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
        <Compass className="w-8 h-8 text-primary" />
      </div>
      <h1 className="text-heading font-bold mb-2">Oops!</h1>
      <p className="text-body text-slate-500 dark:text-slate-400 mb-8">
        Page Not Found — this page doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
      >
        Go Home
      </Link>
    </main>
  );
}

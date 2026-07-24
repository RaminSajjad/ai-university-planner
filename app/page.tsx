import Link from "next/link";
import { Brain, ClipboardList, BarChart3, Clock } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Study Planner",
    description: "Get a personalized daily and weekly study plan generated from your real courses and deadlines.",
  },
  {
    icon: ClipboardList,
    title: "Assignment Tracker",
    description: "Never miss a deadline. Track every assignment across every course in one place.",
  },
  {
    icon: Clock,
    title: "Exam Countdown",
    description: "See exactly how many days you have left to prepare for each exam.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Visualize your study hours, completion rate, and course progress over time.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-4xl md:text-heading font-bold leading-tight max-w-3xl">
          Plan Smarter.<br />
          Study Better.<br />
          Achieve More.
        </h1>
        <p className="mt-6 text-slate-500 dark:text-slate-400 max-w-xl">
          One intelligent platform to manage your courses, assignments, exams, and study time.
        </p>
        <Link
          href="/register"
          className="mt-8 px-8 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div key={f.title} className="card hover:shadow-md hover:-translate-y-1 transition">
            <f.icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-card-title font-semibold mb-2">{f.title}</h3>
            <p className="text-small text-slate-500 dark:text-slate-400">{f.description}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 py-8 mt-16">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-small text-slate-500 dark:text-slate-400">
          <span>&copy; {new Date().getFullYear()} AI University Planner</span>
          <div className="flex gap-6">
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

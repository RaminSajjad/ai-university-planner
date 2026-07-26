"use client";

import { motion } from "framer-motion";
import { Sparkles, Clock } from "lucide-react";

const mockPlan = [
  { time: "9:00 AM", course: "Database Systems", task: "Review Chapter 5 — Normalization", priority: "High" },
  { time: "1:00 PM", course: "AI Fundamentals", task: "Practice search algorithms", priority: "Medium" },
  { time: "6:00 PM", course: "Linear Algebra", task: "Problem set 4", priority: "Medium" },
];

const priorityColor: Record<string, string> = {
  High: "bg-danger/10 text-danger",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-success/10 text-success",
};

export function AIPlanPreviewSection() {
  return (
    <section className="bg-background-dark py-24">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 text-primary text-small font-medium uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            AI Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mt-3 mb-5">
            See what a real plan looks like
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-md">
            Every recommendation comes with a reason — nearest deadlines, harder subjects, and
            your own weak spots all factor into the plan, so it always makes sense.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-xl p-6 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-5 text-slate-300 text-small font-medium">
            <Clock className="w-4 h-4 text-primary" />
            Today's Study Plan
          </div>
          <div className="space-y-3">
            {mockPlan.map((item) => (
              <div key={item.time} className="rounded-xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-primary text-small font-medium">{item.time}</span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${priorityColor[item.priority]}`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-slate-100 text-sm font-medium">{item.course}</p>
                <p className="text-slate-400 text-small">{item.task}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

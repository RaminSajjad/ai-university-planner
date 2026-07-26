"use client";

import { motion } from "framer-motion";
import { UserPlus, BookOpen, ClipboardList, Sparkles } from "lucide-react";

const steps = [
  { icon: UserPlus, title: "Create Account", desc: "Sign up free in seconds — no credit card needed." },
  { icon: BookOpen, title: "Add Courses", desc: "Enter your courses with instructor, credits, and grades." },
  { icon: ClipboardList, title: "Add Assignments", desc: "Log assignments and exams as they're announced." },
  { icon: Sparkles, title: "Generate AI Study Plan", desc: "Get a personalized plan built from your real deadlines." },
];

export function HowItWorksSection() {
  return (
    <section className="bg-background-light dark:bg-background-dark py-24 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-primary text-small font-medium uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">Four steps to your first plan</h2>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="relative text-center"
            >
              <div className="relative z-10 w-12 h-12 mx-auto rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold mb-4">
                {i + 1}
              </div>
              <s.icon className="w-5 h-5 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1.5">{s.title}</h3>
              <p className="text-small text-slate-500 dark:text-slate-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

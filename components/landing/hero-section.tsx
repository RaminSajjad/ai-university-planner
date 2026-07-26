"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, UserCheck, ArrowRight } from "lucide-react";
import { AIPreviewWidget } from "./ai-preview-widget";

const badges = [
  { icon: Sparkles, label: "AI Powered" },
  { icon: ShieldCheck, label: "Secure" },
  { icon: Zap, label: "Fast" },
  { icon: UserCheck, label: "Personalized" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background-dark text-slate-100">
      {/* Ambient background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.15),transparent_50%),radial-gradient(circle_at_80%_60%,rgba(124,58,237,0.12),transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 pt-28 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 text-small font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            AI Powered Academic Planning
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-heading font-bold leading-tight mb-6">
            Plan Smarter.
            <br />
            Study Better.
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Achieve More.
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-md mb-8 leading-relaxed">
            One intelligent workspace for your courses, assignments, and exams — with an AI
            planner that turns your real deadlines into a study plan you'll actually follow.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              href="/register"
              className="group flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="px-7 py-3 rounded-xl border border-white/15 text-slate-200 font-medium hover:bg-white/5 transition"
            >
              Learn More
            </Link>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {badges.map((b) => (
              <span key={b.label} className="flex items-center gap-1.5 text-small text-slate-400">
                <b.icon className="w-3.5 h-3.5 text-primary" />
                {b.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right column — animated preview */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <AIPreviewWidget />
        </motion.div>
      </div>
    </section>
  );
}

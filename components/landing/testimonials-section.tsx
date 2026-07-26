"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah A.",
    role: "Computer Science, Sophomore",
    quote: "I stopped juggling five different apps. Now I just check my plan every morning and go.",
  },
  {
    name: "Hamza K.",
    role: "Business Administration, Junior",
    quote: "The exam countdown alone saved me from missing a deadline this semester.",
  },
  {
    name: "Aisha R.",
    role: "Electrical Engineering, Senior",
    quote: "Seeing the reason behind every study block actually made me trust the plan.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-background-light dark:bg-background-dark py-24 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-xl mx-auto mb-4">
          <span className="text-primary text-small font-medium uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">What students say</h2>
        </div>
        <p className="text-center text-small text-slate-400 mb-14">
          Sample quotes for demonstration purposes
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="card"
            >
              <Quote className="w-5 h-5 text-primary/50 mb-3" />
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-small text-slate-500 dark:text-slate-400">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

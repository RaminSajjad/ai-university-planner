"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is AI University Planner really free?",
    a: "Yes — there's no credit card and no trial countdown. It's built as a student final-year project and is free to use.",
  },
  {
    q: "Does the AI make up assignments or exams?",
    a: "No. The AI Study Planner only ever reasons over courses, assignments, and exams you've actually entered — it never invents data.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Every course, assignment, and exam is scoped to your account only — other users can never see or edit your data.",
  },
  {
    q: "Can I use this on my phone?",
    a: "Yes, the whole app is fully responsive, including a mobile navigation menu.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-background-light dark:bg-background-dark py-24 border-t border-slate-200 dark:border-white/5">
      <div className="max-w-2xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-12">
          <span className="text-primary text-small font-medium uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3">Common questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={faq.q} className="card !p-0 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-medium"
                >
                  {faq.q}
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-4 text-small text-slate-500 dark:text-slate-400 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

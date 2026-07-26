"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Sparkles, ClipboardList, Clock, Brain } from "lucide-react";

const stats = [
  { icon: Brain, value: 100, suffix: "%", label: "AI Powered" },
  { icon: Sparkles, value: 1, suffix: "-Click", label: "Personalized Plans" },
  { icon: ClipboardList, value: 3, suffix: "+", label: "Assignments Managed / Semester" },
  { icon: Clock, value: 40, suffix: "%", label: "Less Time Spent Scheduling" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (!isInView || reducedMotion) return;
    const duration = 1200;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [isInView, value, reducedMotion]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="bg-background-dark border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="text-center"
          >
            <s.icon className="w-5 h-5 text-primary mx-auto mb-3" />
            <p className="text-3xl font-bold text-slate-100">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="text-small text-slate-400 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

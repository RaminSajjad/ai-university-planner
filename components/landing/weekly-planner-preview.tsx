"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";

const days = ["MON", "TUE", "WED", "THU", "FRI"];

// Each row is a study slot; `fill` marks which day/slot pairs the AI has
// already "highlighted" — this is the animation's source of truth.
const rows = [
  { label: "9 AM", blocks: ["DB", "", "AI", "", "DB"] },
  { label: "1 PM", blocks: ["", "CALC", "", "CALC", ""] },
  { label: "6 PM", blocks: ["AI", "", "STAT", "", "AI"] },
];

export function WeeklyPlannerPreview() {
  let delayIndex = 0;

  return (
    <div className="relative">
      {/* Floating deadline chip */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{ opacity: { delay: 1.4, duration: 0.4 }, y: { delay: 1.8, duration: 3, repeat: Infinity, ease: "easeInOut" } }}
        className="absolute -top-5 -right-4 sm:-right-8 z-10 flex items-center gap-2 rounded-full bg-[#12182B] text-[#F7F3E8] pl-2 pr-3.5 py-1.5 shadow-lg border border-[#E4FF3D]/30"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B4A] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF6B4A]" />
        </span>
        <span className="font-mono text-[11px] tracking-wide">DB EXAM · 3D LEFT</span>
      </motion.div>

      {/* "AI generated" seal */}
      <motion.div
        initial={{ opacity: 0, rotate: -2, scale: 0.9 }}
        animate={{ opacity: 1, rotate: -6, scale: 1 }}
        transition={{ delay: 2.1, duration: 0.4, ease: "backOut" }}
        className="absolute -bottom-4 -left-3 sm:-left-6 z-10 rounded-full border border-[#12182B]/15 bg-[#F7F3E8] px-3 py-1.5 shadow-md"
      >
        <span className="font-mono text-[10px] tracking-widest text-[#12182B]/70">✓ AI-GENERATED PLAN</span>
      </motion.div>

      {/* The planner grid itself */}
      <div className="rounded-2xl border border-[#12182B]/10 bg-[#F7F3E8] p-5 sm:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-[11px] tracking-widest text-[#12182B]/50">WEEK 12 · STUDY PLAN</span>
          <span className="font-mono text-[11px] tracking-widest text-[#12182B]/50">4H / DAY</span>
        </div>

        <div className="grid grid-cols-[40px_repeat(5,1fr)] gap-1.5 sm:gap-2">
          <div />
          {days.map((d) => (
            <div key={d} className="text-center font-mono text-[10px] tracking-wider text-[#12182B]/40 pb-1">
              {d}
            </div>
          ))}

          {rows.map((row) => (
            <Fragment key={row.label}>
              <div className="flex items-center font-mono text-[10px] text-[#12182B]/40">
                {row.label}
              </div>
              {row.blocks.map((block, i) => {
                const isFilled = block !== "";
                const currentDelay = isFilled ? 0.5 + delayIndex * 0.18 : 0;
                if (isFilled) delayIndex += 1;

                return (
                  <motion.div
                    key={`${row.label}-${i}`}
                    initial={isFilled ? { backgroundColor: "rgba(228,255,61,0)", scale: 0.9 } : undefined}
                    animate={
                      isFilled
                        ? { backgroundColor: "rgba(228,255,61,0.9)", scale: 1 }
                        : undefined
                    }
                    transition={{ delay: currentDelay, duration: 0.35, ease: "easeOut" }}
                    className={`h-9 sm:h-10 rounded-md flex items-center justify-center font-mono text-[10px] font-medium text-[#12182B] ${
                      isFilled ? "" : "bg-[#12182B]/[0.03]"
                    }`}
                  >
                    {block}
                  </motion.div>
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

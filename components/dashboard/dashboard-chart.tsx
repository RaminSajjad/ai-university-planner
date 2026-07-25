"use client";

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import type { StudyPlanOutput } from "@/lib/ai";

export function DashboardChart({ plan }: { plan: StudyPlanOutput | null }) {
  if (!plan || plan.weeklyPlan.length === 0) {
    return (
      <div className="card flex items-center justify-center h-64 text-small text-slate-500 dark:text-slate-400">
        Generate a study plan to see your weekly hours chart.
      </div>
    );
  }

  const data = plan.weeklyPlan.map((d) => ({ day: d.day.slice(0, 3), hours: d.hours }));

  return (
    <div className="card">
      <h3 className="text-card-title font-semibold mb-4">Weekly Study Hours</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="hours" fill="#2563EB" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#22C55E", "#F59E0B"];

export function CompletionPieChart({ completed, pending }: { completed: number; pending: number }) {
  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  if (completed === 0 && pending === 0) {
    return (
      <div className="flex items-center justify-center h-56 text-small text-slate-500 dark:text-slate-400">
        No assignments yet.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function CourseProgressChart({
  data,
}: {
  data: { courseName: string; assignmentsCompleted: number; assignmentsTotal: number }[];
}) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-56 text-small text-slate-500 dark:text-slate-400">
        No courses yet.
      </div>
    );
  }

  const chartData = data.map((d) => ({
    course: d.courseName.length > 12 ? d.courseName.slice(0, 12) + "…" : d.courseName,
    completed: d.assignmentsCompleted,
    total: d.assignmentsTotal,
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="course" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="total" fill="#e2e8f0" radius={[6, 6, 0, 0]} name="Total" />
        <Bar dataKey="completed" fill="#7C3AED" radius={[6, 6, 0, 0]} name="Completed" />
      </BarChart>
    </ResponsiveContainer>
  );
}

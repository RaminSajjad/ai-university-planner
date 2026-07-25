import { type LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value,
  accent = "primary",
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  accent?: "primary" | "secondary" | "success" | "warning";
}) {
  const colorMap = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
  };

  return (
    <div className="card">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorMap[accent]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-small text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  );
}

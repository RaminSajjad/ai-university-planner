import { Clock, Lightbulb, CalendarDays } from "lucide-react";
import type { StudyPlanOutput } from "@/lib/ai";

const priorityColor: Record<string, string> = {
  High: "bg-danger/10 text-danger",
  Medium: "bg-warning/10 text-warning",
  Low: "bg-success/10 text-success",
};

export function PlanResult({ plan }: { plan: StudyPlanOutput }) {
  return (
    <div className="space-y-6">
      {/* Today's Plan */}
      <div>
        <h3 className="text-card-title font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Today&apos;s Plan
        </h3>
        <div className="space-y-3">
          {plan.todayPlan.map((item, i) => (
            <div key={i} className="card">
              <div className="flex items-start justify-between mb-1">
                <span className="text-small font-medium text-primary">{item.time}</span>
                <span className={`text-small font-medium px-2 py-0.5 rounded-md ${priorityColor[item.priority]}`}>
                  {item.priority}
                </span>
              </div>
              <p className="font-medium">
                {item.course} — {item.task}
              </p>
              <p className="text-small text-slate-500 dark:text-slate-400 mt-1">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Plan */}
      <div>
        <h3 className="text-card-title font-semibold mb-3 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-secondary" />
          Weekly Plan
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {plan.weeklyPlan.map((day, i) => (
            <div key={i} className="card">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{day.day}</span>
                <span className="text-small text-slate-500 dark:text-slate-400">{day.hours}h</span>
              </div>
              <p className="text-small font-medium text-secondary">{day.focus}</p>
              <p className="text-small text-slate-500 dark:text-slate-400 mt-1">{day.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      {plan.tips.length > 0 && (
        <div className="card">
          <h3 className="text-card-title font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-warning" />
            Study Tips
          </h3>
          <ul className="space-y-2">
            {plan.tips.map((tip, i) => (
              <li key={i} className="text-small text-slate-600 dark:text-slate-300 flex gap-2">
                <span className="text-warning">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

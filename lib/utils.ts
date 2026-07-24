import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merges Tailwind classes safely, avoiding conflicts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formats a date like "Aug 12, 2026"
export function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Returns "3 days left" / "Overdue" style countdown text
export function daysUntil(date: Date | string) {
  const target = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));

  if (diff < 0) return "Overdue";
  if (diff === 0) return "Due today";
  if (diff === 1) return "1 day left";
  return `${diff} days left`;
}

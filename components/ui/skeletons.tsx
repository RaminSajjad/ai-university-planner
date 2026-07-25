export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="h-7 w-40 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />
        <div className="h-10 w-32 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="card space-y-3">
            <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="h-5 w-3/4 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="h-4 w-1/2 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />
              <div className="h-6 w-16 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6">
      <div className="h-7 w-56 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="card space-y-3">
            <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="h-6 w-16 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />
            <div className="h-4 w-24 rounded-md bg-slate-200 dark:bg-slate-700 animate-pulse" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="card h-40 bg-slate-100 dark:bg-slate-700 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function WindowSkeleton() {
  return (
    <div className="bg-card border-border overflow-hidden rounded-lg border">
      <div className="border-border text-mauve flex items-center border-b px-4 py-2 font-mono text-xs tracking-wider uppercase">
        <span>~/recommendations/</span>
      </div>
      <div className="flex min-h-[60vh] flex-col lg:flex-row">
        <div className="bg-background border-border w-full border-b lg:w-64 lg:flex-shrink-0 lg:border-r lg:border-b-0" />
        <div className="bg-card flex-1" />
      </div>
    </div>
  );
}

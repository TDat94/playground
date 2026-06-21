export function EmptyState() {
  return (
    <div className="text-muted-foreground flex h-full min-h-[60vh] flex-col items-center justify-center gap-2 px-6 py-6 font-mono text-sm">
      <p># select a file from the sidebar</p>
      <p>
        → or paste a link with{' '}
        <span className="text-foreground">?id=&lt;name&gt;</span> in the address
        bar
      </p>
    </div>
  );
}

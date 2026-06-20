import { news } from '@/features/news/data';

function formatDate(d: Date): string {
  if (Number.isNaN(d.getTime())) return '????-??';
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

export function NewsLog() {
  const sorted = [...news].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <ul role="list" className="font-mono">
      {sorted.map((item, i) => (
        <li
          key={`${item.time}-${i}`}
          className="hover:border-mauve border-border border-l-2 py-3 pl-4 transition-colors"
        >
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
            <span className="text-muted-foreground w-20 shrink-0 text-sm tabular-nums">
              {formatDate(item.date)}
            </span>
            <span className="text-mauve" aria-hidden>
              ●
            </span>
            <span className="text-foreground text-sm sm:text-base">
              {item.content}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

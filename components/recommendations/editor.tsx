'use client';

import { Fragment } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Recommendation } from '@/types/mimic-file-system';
import { EmptyState } from './empty-state';

interface EditorProps {
  active: Recommendation | null;
  onClose: () => void;
}

type Line =
  | { kind: 'kv'; key: string; value: string }
  | { kind: 'header'; text: string }
  | { kind: 'paragraph'; text: string }
  | { kind: 'link'; href: string; text: string }
  | { kind: 'blank' };

function buildLines(rec: Recommendation): Line[] {
  const lines: Line[] = [
    { kind: 'kv', key: 'name', value: rec.name },
    { kind: 'kv', key: 'type', value: rec.type },
  ];
  if (rec.tags.length > 0) {
    lines.push({ kind: 'kv', key: 'tags', value: rec.tags.join(', ') });
  }
  if (rec.platform && rec.platform.length > 0) {
    lines.push({
      kind: 'kv',
      key: 'platform',
      value: rec.platform.join(', '),
    });
  }
  lines.push({ kind: 'blank' });
  lines.push({ kind: 'header', text: 'description' });
  lines.push({ kind: 'paragraph', text: rec.description });
  if (rec.reason) {
    lines.push({ kind: 'blank' });
    lines.push({ kind: 'header', text: 'reason' });
    lines.push({ kind: 'paragraph', text: rec.reason });
  }
  if (rec.link) {
    lines.push({ kind: 'blank' });
    lines.push({ kind: 'header', text: 'link' });
    lines.push({ kind: 'link', href: rec.link, text: rec.link });
  }
  return lines;
}

function pad(n: number, width: number): string {
  return n.toString().padStart(width, ' ');
}

export function Editor({ active, onClose }: EditorProps) {
  if (!active) {
    return (
      <section aria-label="Editor" className="bg-card flex-1 overflow-y-auto">
        <EmptyState />
      </section>
    );
  }

  const lines = buildLines(active);
  const gutterWidth = String(lines.length).length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
    }
  };

  return (
    <section
      aria-label={active.name}
      role="document"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="bg-card flex-1 overflow-y-auto focus:outline-none"
    >
      <div className="border-border flex items-start justify-between gap-2 border-b px-4 py-2">
        <span className="text-foreground font-mono text-sm">
          {active.id}.{active.type}
        </span>
        <Button
          variant="ghost"
          size="xs"
          onClick={onClose}
          className="font-mono"
          aria-label="Close file"
        >
          <X data-icon="inline-start" />
          close
        </Button>
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-x-3 px-4 py-6 font-mono text-sm">
        {lines.map((line, i) => (
          <Fragment key={i}>
            <div
              aria-hidden
              className="text-muted-foreground self-start text-right font-mono text-xs tabular-nums select-none"
            >
              {pad(i + 1, gutterWidth)}
            </div>
            <div className="text-foreground min-w-0">
              <LineRow line={line} />
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

function LineRow({ line }: { line: Line }) {
  switch (line.kind) {
    case 'blank':
      return <p className="invisible">.</p>;
    case 'kv':
      return (
        <p>
          <span className="text-muted-foreground inline-block w-28">
            {line.key}
          </span>
          <span className="text-foreground">{line.value}</span>
        </p>
      );
    case 'header':
      return <p className="text-muted-foreground">{line.text}</p>;
    case 'paragraph':
      return <p className="text-foreground">{line.text}</p>;
    case 'link':
      return (
        <p>
          <a
            href={line.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mauve hover:underline"
            title={line.href}
          >
            ↗ {line.text}
          </a>
        </p>
      );
  }
}

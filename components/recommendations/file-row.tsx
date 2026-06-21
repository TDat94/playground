'use client';

import {
  RECOMMENDATION_TYPE_ICON,
  type RecommendationType,
} from '@/types/mimic-file-system';
import { cn } from '@/lib/utils';

interface FileRowProps {
  id: string;
  type: RecommendationType;
  isActive: boolean;
  onSelect: () => void;
}

export function FileRow({ id, type, isActive, onSelect }: FileRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      aria-current={isActive ? 'true' : undefined}
      className={cn(
        'hover:bg-secondary flex w-full items-center gap-2 border-l-2 border-transparent py-1 pr-4 pl-12 text-left text-sm transition-colors',
        isActive && 'border-mauve text-mauve',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'nf shrink-0',
          RECOMMENDATION_TYPE_ICON[type],
          isActive ? 'text-mauve' : 'text-muted-foreground',
        )}
      />
      <span className="truncate">
        {id}.{type}
      </span>
    </button>
  );
}

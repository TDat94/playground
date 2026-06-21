'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import {
  RECOMMENDATION_TYPE_ICON,
  type Recommendation,
  type RecommendationType,
} from '@/types/mimic-file-system';
import { FileRow } from './file-row';

interface FolderRowProps {
  type: RecommendationType;
  items: Recommendation[];
  isOpen: boolean;
  activeId: string | null;
  onToggle: () => void;
  onSelectFile: (id: string) => void;
}

export function FolderRow({
  type,
  items,
  isOpen,
  activeId,
  onToggle,
  onSelectFile,
}: FolderRowProps) {
  const reduce = useReducedMotion();
  const panelId = `folder-panel-${type}`;
  const icon = RECOMMENDATION_TYPE_ICON[type];

  return (
    <li className="border-border border-b last:border-b-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="hover:bg-secondary flex w-full items-center gap-3 px-4 py-2 text-left transition-colors"
      >
        <motion.span
          animate={reduce ? undefined : { rotate: isOpen ? 90 : 0 }}
          transition={reduce ? undefined : { duration: 0.2 }}
          className="text-muted-foreground block"
          aria-hidden
        >
          <ChevronRight />
        </motion.span>
        <span
          aria-hidden
          className={`nf text-muted-foreground shrink-0 ${icon}`}
        />
        <span className="text-foreground flex-1 truncate">{type}</span>
        <span className="text-muted-foreground shrink-0 pr-1 tabular-nums">
          {items.length}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={reduce ? undefined : { height: 'auto', opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={reduce ? undefined : { duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <ul role="list" className="py-1">
              {items.map((item) => (
                <li key={item.id}>
                  <FileRow
                    id={item.id}
                    type={item.type}
                    isActive={activeId === item.id}
                    onSelect={() => onSelectFile(item.id)}
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

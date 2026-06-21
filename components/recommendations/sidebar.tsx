'use client';

import type {
  Recommendation,
  RecommendationType,
} from '@/types/mimic-file-system';
import { FolderRow } from './folder-row';

interface SidebarProps {
  groups: { type: RecommendationType; items: Recommendation[] }[];
  expanded: Set<RecommendationType>;
  activeId: string | null;
  onToggleFolder: (type: RecommendationType) => void;
  onSelectFile: (id: string) => void;
}

export function Sidebar({
  groups,
  expanded,
  activeId,
  onToggleFolder,
  onSelectFile,
}: SidebarProps) {
  return (
    <aside
      aria-label="Recommendations by type"
      className="bg-background border-border w-full overflow-y-auto border-b lg:w-64 lg:flex-shrink-0 lg:overflow-x-auto lg:border-r lg:border-b-0"
    >
      <ul role="list" className="font-mono text-sm">
        {groups.map((group) => (
          <FolderRow
            key={group.type}
            type={group.type}
            items={group.items}
            isOpen={expanded.has(group.type)}
            activeId={activeId}
            onToggle={() => onToggleFolder(group.type)}
            onSelectFile={onSelectFile}
          />
        ))}
      </ul>
    </aside>
  );
}

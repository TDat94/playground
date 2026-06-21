import {
  KanbanBoardColumnList,
  KanbanBoardColumnTitle,
} from '~/components/kanban';
import { cn } from '~/lib/utils';
import type { Card, KanbanBoardCircleColor, Status } from '~/types/kanban';

import { KanbanCard } from './card';

const GLYPH_BY_STATUS: Record<Status, string> = {
  Backlog: 'nf nf-oct-circle',
  Planned: 'nf nf-md-progress_clock',
  'In Progress': 'nf nf-md-progress_clock',
  Completed: 'nf nf-oct-check',
};

type KanbanColumnProps = {
  status: Status;
  color: KanbanBoardCircleColor;
  cards: Card[];
};

export const kanbanBoardColumnClassNames =
  'w-56 flex-shrink-0 rounded-lg border flex flex-col border-border bg-card overflow-hidden max-h-full';

export const KanbanColumn = ({ status, color, cards }: KanbanColumnProps) => {
  return (
    <section
      aria-labelledby={`column-${status}-title`}
      className={cn(kanbanBoardColumnClassNames)}
    >
      <div className="border-border flex items-center justify-between border-b px-3 py-1.5">
        <KanbanBoardColumnTitle
          columnId={status}
          className="text-mauve flex items-center gap-2 font-mono text-xs font-semibold tracking-wider uppercase"
        >
          <span aria-hidden className={GLYPH_BY_STATUS[status]} />
          <span>{status}</span>
        </KanbanBoardColumnTitle>
        <span className="text-muted-foreground font-mono text-xs">
          {cards.length}
        </span>
      </div>

      <KanbanBoardColumnList>
        {cards.length === 0 ? (
          <li className="text-muted-foreground flex h-full min-h-24 flex-col items-center justify-center gap-1 px-3 py-8 font-mono text-xs">
            <span># no item</span>
          </li>
        ) : (
          cards.map((card) => (
            <KanbanCard key={card.id} card={card} color={color} />
          ))
        )}
      </KanbanBoardColumnList>
    </section>
  );
};

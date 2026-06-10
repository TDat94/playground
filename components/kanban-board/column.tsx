import {
  KanbanBoardColumnHeader,
  KanbanBoardColumnList,
  KanbanBoardColumnTitle,
} from '~/components/kanban';
import { cn } from '~/lib/utils';
import type { Card, KanbanBoardCircleColor, Status } from '~/types/kanban';

import { KanbanCard } from './card';

type KanbanColumnProps = {
  status: Status;
  color: KanbanBoardCircleColor;
  cards: Card[];
};

export const kanbanBoardColumnClassNames =
  'w-64 flex-shrink-0 rounded-lg border flex flex-col border-border bg-sidebar py-2 max-h-full';

export const KanbanColumn = ({ status, color, cards }: KanbanColumnProps) => {
  return (
    <section
      aria-labelledby={`column-${status}-title`}
      className={cn(kanbanBoardColumnClassNames)}
    >
      <KanbanBoardColumnHeader>
        <KanbanBoardColumnTitle columnId={status}>
          <span className="text-foreground/80 text-xs font-semibold tracking-wide uppercase">
            {status}
          </span>
          <span className="text-muted-foreground ml-2 text-xs">
            {cards.length}
          </span>
        </KanbanBoardColumnTitle>
      </KanbanBoardColumnHeader>

      <KanbanBoardColumnList>
        {cards.map((card) => (
          <KanbanCard key={card.id} card={card} color={color} />
        ))}
      </KanbanBoardColumnList>
    </section>
  );
};

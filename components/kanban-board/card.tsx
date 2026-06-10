import {
  KanbanBoardCardDescription,
  KanbanBoardCardTitle,
  type KanbanBoardCircleColor,
} from '~/components/kanban';
import { cn } from '~/lib/utils';
import type { Card } from '~/types/kanban';

type KanbanCardProps = {
  card: Card;
  color: KanbanBoardCircleColor;
};

const COLOR_CIRCLE_CLASS: Record<KanbanBoardCircleColor, string> = {
  primary: 'bg-kanban-board-circle-primary',
  gray: 'bg-kanban-board-circle-gray',
  red: 'bg-kanban-board-circle-red',
  yellow: 'bg-kanban-board-circle-yellow',
  green: 'bg-kanban-board-circle-green',
  cyan: 'bg-kanban-board-circle-cyan',
  blue: 'bg-kanban-board-circle-blue',
  indigo: 'bg-kanban-board-circle-indigo',
  violet: 'bg-kanban-board-circle-violet',
  purple: 'bg-kanban-board-circle-purple',
  pink: 'bg-kanban-board-circle-pink',
};

export const KanbanCard = ({ card, color }: KanbanCardProps) => {
  return (
    <li className="px-2 py-1">
      <div className="border-border bg-background text-foreground flex w-full flex-col gap-1 rounded-lg border p-3 text-start shadow-sm">
        <div className="flex w-full items-start gap-2">
          <span
            aria-hidden
            className={cn(
              'mt-1.5 size-2 shrink-0 rounded-full',
              COLOR_CIRCLE_CLASS[color],
            )}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            {card.title ? (
              <KanbanBoardCardTitle>{card.title}</KanbanBoardCardTitle>
            ) : (
              <KanbanBoardCardTitle className="text-muted-foreground italic">
                Untitled
              </KanbanBoardCardTitle>
            )}
            {card.description ? (
              <KanbanBoardCardDescription>
                {card.description}
              </KanbanBoardCardDescription>
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
};

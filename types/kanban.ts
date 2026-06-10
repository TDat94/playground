import type { KanbanBoardCircleColor } from '~/components/kanban';
import { KANBAN_BOARD_CIRCLE_COLORS } from '~/components/kanban';

export { KANBAN_BOARD_CIRCLE_COLORS };
export type { KanbanBoardCircleColor } from '~/components/kanban';

export type Status = 'Backlog' | 'Planned' | 'In Progress' | 'Completed';

export const STATUSES: Status[] = [
  'Backlog',
  'Planned',
  'In Progress',
  'Completed',
];

export type Card = {
  id: string;
  title: string;
  description: string;
};

export type Column = {
  id: Status;
  color: KanbanBoardCircleColor;
  cards: Card[];
};

export type BoardData = Column[];

import { KanbanBoard, KanbanBoardExtraMargin } from '~/components/kanban';
import type { BoardData } from '~/types/kanban';

import { KanbanColumn } from './column';

type KanbanBoardViewProps = {
  data: BoardData;
};

export const KanbanBoardView = ({ data }: KanbanBoardViewProps) => {
  return (
    <KanbanBoard>
      {data.map((column) => (
        <KanbanColumn
          key={column.id}
          status={column.id}
          color={column.color}
          cards={column.cards}
        />
      ))}
      <KanbanBoardExtraMargin />
    </KanbanBoard>
  );
};

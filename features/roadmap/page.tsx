import { KanbanBoardView } from '~/components/kanban-board/board';
import { roadmap } from '~/features/roadmap/data';

export default function RoadmapPage() {
  return (
    <div className="bg-background w-full">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-stretch justify-start gap-4 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-start gap-2">
          <h1 className="text-foreground text-3xl font-semibold tracking-tighter">
            Roadmap
          </h1>
          <p className="text-foreground/70 text-sm">
            A view of what is planned, in progress, and recently shipped for
            this playground.
          </p>
        </div>

        <div className="-mx-4 min-h-[60vh] sm:-mx-6 lg:mx-0">
          <KanbanBoardView data={roadmap} />
        </div>
      </div>
    </div>
  );
}

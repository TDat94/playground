import { KanbanBoardView } from '~/components/kanban-board/board';
import { roadmap } from '~/features/roadmap/data';

export default function RoadmapPage() {
  const total = roadmap.reduce((acc, col) => acc + col.cards.length, 0);
  const lastUpdated = new Date().toISOString().slice(0, 10);
  return (
    <div className="bg-background w-full">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h1 className="font-display text-foreground text-3xl tracking-tighter sm:text-4xl">
          ~/roadmap.md
        </h1>
        <p className="text-muted-foreground font-mono text-sm">
          # {total} items · last updated {lastUpdated}
        </p>
        <div className="-mx-4 mt-6 min-h-[60vh] sm:-mx-6 lg:mx-0">
          <KanbanBoardView data={roadmap} />
        </div>
      </div>
    </div>
  );
}

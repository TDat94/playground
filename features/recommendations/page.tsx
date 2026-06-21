import { Suspense } from 'react';
import { Footer } from '@/components/landing/footer';
import { Window } from '@/components/recommendations/window';
import { WindowSkeleton } from '@/components/recommendations/window-skeleton';
import { recommendations, typeCount } from '@/features/recommendations/data';

export default function RecommendationsPage() {
  const itemCount = recommendations.length;
  const typeTotal = typeCount(recommendations);
  return (
    <div className="bg-background w-full">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <h1 className="font-display text-foreground text-3xl tracking-tighter sm:text-4xl">
          ~/recommendations/
        </h1>
        <p className="text-muted-foreground font-mono text-sm">
          # {itemCount} {itemCount === 1 ? 'item' : 'items'} · {typeTotal}{' '}
          {typeTotal === 1 ? 'type' : 'types'}
        </p>
        <div className="mt-6">
          <Suspense fallback={<WindowSkeleton />}>
            <Window />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}

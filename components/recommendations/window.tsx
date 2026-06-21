'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { recommendations, groupByType } from '@/features/recommendations/data';
import type { RecommendationType } from '@/types/mimic-file-system';
import { Sidebar } from './sidebar';
import { Editor } from './editor';

const VALID_IDS = new Set(recommendations.map((r) => r.id));

export function Window() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id');
  const initialSelected =
    initialId && VALID_IDS.has(initialId) ? initialId : null;

  const [selectedId, setSelectedId] = useState<string | null>(initialSelected);
  const [expanded, setExpanded] = useState<Set<RecommendationType>>(() => {
    if (initialSelected) {
      const rec = recommendations.find((r) => r.id === initialSelected);
      return rec ? new Set([rec.type]) : new Set();
    }
    return new Set();
  });

  const groups = useMemo(() => groupByType(recommendations), []);

  const handleSelectFile = useCallback(
    (id: string) => {
      setSelectedId(id);
      const rec = recommendations.find((r) => r.id === id);
      if (rec) {
        setExpanded((prev) => {
          if (prev.has(rec.type)) return prev;
          const next = new Set(prev);
          next.add(rec.type);
          return next;
        });
      }
      router.replace(`/recommendations?id=${id}`, { scroll: false });
    },
    [router],
  );

  const handleCloseFile = useCallback(() => {
    setSelectedId(null);
    router.replace('/recommendations', { scroll: false });
  }, [router]);

  const handleToggleFolder = useCallback((type: RecommendationType) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  }, []);

  // Sync state to URL when user navigates back/forward (e.g. browser back).
  useEffect(() => {
    const id = searchParams.get('id');
    const valid = id && VALID_IDS.has(id) ? id : null;
    if (valid !== selectedId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedId(valid);
      if (valid) {
        const rec = recommendations.find((r) => r.id === valid);
        if (rec) {
          setExpanded((prev) => {
            if (prev.has(rec.type)) return prev;
            const next = new Set(prev);
            next.add(rec.type);
            return next;
          });
        }
      }
    }
    // We intentionally don't depend on `selectedId` to avoid an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const active = useMemo(
    () => recommendations.find((r) => r.id === selectedId) ?? null,
    [selectedId],
  );

  return (
    <div className="bg-card border-border overflow-hidden rounded-lg border">
      <div className="border-border text-mauve flex items-center border-b px-4 py-2 font-mono text-xs tracking-wider uppercase">
        <span>~/recommendations/</span>
      </div>
      <div className="flex min-h-[60vh] flex-col lg:flex-row">
        <Sidebar
          groups={groups}
          expanded={expanded}
          activeId={selectedId}
          onToggleFolder={handleToggleFolder}
          onSelectFile={handleSelectFile}
        />
        <Editor active={active} onClose={handleCloseFile} />
      </div>
    </div>
  );
}

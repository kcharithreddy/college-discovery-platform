'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import type { College } from '@/lib/api';
import { CollegeLogo } from '@/components/CollegeLogo';

export type CompareItem = Pick<College, 'id' | 'name' | 'slug' | 'logo'>;

type CompareContextValue = {
  items: CompareItem[];
  has: (id: string) => boolean;
  toggle: (college: CompareItem) => { ok: boolean; message?: string };
  remove: (id: string) => void;
  clear: () => void;
};

export const MAX_COMPARE = 3;
const STORAGE_KEY = 'compare-colleges';
const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (Array.isArray(stored)) setItems(stored.slice(0, MAX_COMPARE));
    } catch {
      // Storage unavailable (private mode etc.): start empty.
    }
  }, []);

  const persist = useCallback((next: CompareItem[]) => {
    setItems(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }, []);

  const value = useMemo<CompareContextValue>(() => ({
    items,
    has: id => items.some(item => item.id === id),
    toggle: college => {
      if (items.some(item => item.id === college.id)) {
        persist(items.filter(item => item.id !== college.id));
        return { ok: true };
      }
      if (items.length >= MAX_COMPARE) return { ok: false, message: `You can compare up to ${MAX_COMPARE} colleges` };
      persist([...items, { id: college.id, name: college.name, slug: college.slug, logo: college.logo }]);
      return { ok: true };
    },
    remove: id => persist(items.filter(item => item.id !== id)),
    clear: () => persist([])
  }), [items, persist]);

  return (
    <CompareContext.Provider value={value}>
      {children}
      <CompareTray />
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used inside CompareProvider');
  return ctx;
}

function CompareTray() {
  const { items, remove, clear } = useCompare();
  const pathname = usePathname();
  if (items.length === 0 || pathname === '/compare') return null;

  return (
    <aside aria-label="Colleges selected for comparison" className="fixed inset-x-0 bottom-0 z-30 px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto flex max-w-3xl animate-fade-up items-center gap-3 rounded-2xl border border-line bg-surface/95 p-3 shadow-lift backdrop-blur">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
          {items.map(item => (
            <span key={item.id} className="flex shrink-0 items-center gap-2 rounded-xl bg-muted py-1 pl-1 pr-2 text-sm font-semibold">
              <CollegeLogo college={item} size="xs" />
              <span className="max-w-[9rem] truncate">{item.name}</span>
              <button onClick={() => remove(item.id)} aria-label={`Remove ${item.name} from compare`} className="rounded-md p-0.5 text-faint hover:bg-line hover:text-ink">
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          {items.length < 2 && <span className="shrink-0 text-sm text-sub">Add {2 - items.length} more to compare</span>}
        </div>
        <button onClick={clear} className="btn-ghost hidden px-3 sm:inline-flex">Clear</button>
        {items.length >= 2 ? (
          <Link href="/compare" className="btn-primary shrink-0">Compare <ArrowRight className="h-4 w-4" /></Link>
        ) : (
          <span className="btn-primary shrink-0 opacity-50">Compare</span>
        )}
      </div>
    </aside>
  );
}

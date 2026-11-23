'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Check, Plus, Scale, Search, X } from 'lucide-react';
import { CollegeLogo } from '@/components/CollegeLogo';
import { MAX_COMPARE, useCompare } from '@/components/CompareProvider';
import { College, api, formatFees, formatLpa, formatPercent } from '@/lib/api';

type Row = {
  label: string;
  render: (c: College) => React.ReactNode;
  /** Optional numeric value used to highlight the best college in the row. */
  score?: (c: College) => number | null;
  better?: 'high' | 'low';
};

const ROWS: Row[] = [
  { label: 'NIRF rank', render: c => (c.nirfRank ? `#${c.nirfRank}${c.nirfYear ? ` (${c.nirfYear})` : ''}` : '—'), score: c => c.nirfRank, better: 'low' },
  { label: 'Type', render: c => `${c.type} · ${c.ownership}` },
  { label: 'Location', render: c => `${c.city}, ${c.state}` },
  { label: 'Established', render: c => c.established ?? '—' },
  { label: 'Entrance exam', render: c => c.exam },
  { label: 'Tuition / year', render: c => formatFees(c.fees), score: c => c.fees, better: 'low' },
  { label: 'Hostel + mess / year', render: c => formatFees(c.hostelFees), score: c => c.hostelFees, better: 'low' },
  { label: 'Students placed', render: c => formatPercent(c.placementRate), score: c => c.placementRate, better: 'high' },
  { label: 'Median package', render: c => formatLpa(c.medianPackage), score: c => c.medianPackage, better: 'high' },
  { label: 'Average package', render: c => formatLpa(c.averagePackage), score: c => c.averagePackage, better: 'high' },
  { label: 'Campus size', render: c => (c.campusAcres ? `${c.campusAcres} acres` : '—'), score: c => c.campusAcres, better: 'high' },
  { label: 'Hostel', render: c => (c.hostelAvailable ? 'Yes' : 'No') },
  { label: 'Student rating', render: c => (c.rating != null ? `${c.rating} / 5 (${c.reviewCount})` : 'No reviews yet'), score: c => c.rating, better: 'high' },
  { label: 'Programmes', render: c => c.courses?.length ?? '—' }
];

function bestIds(row: Row, colleges: College[]) {
  if (!row.score) return new Set<string>();
  const scored = colleges.map(c => ({ id: c.id, v: row.score!(c) })).filter((x): x is { id: string; v: number } => x.v != null);
  if (scored.length < 2) return new Set<string>();
  const target = row.better === 'low' ? Math.min(...scored.map(x => x.v)) : Math.max(...scored.map(x => x.v));
  if (scored.every(x => x.v === target)) return new Set<string>();
  return new Set(scored.filter(x => x.v === target).map(x => x.id));
}

export default function ComparePage() {
  const compare = useCompare();
  const [data, setData] = useState<College[]>([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<College[]>([]);
  const [message, setMessage] = useState('');

  const ids = compare.items.map(item => item.id).join(',');

  useEffect(() => {
    if (compare.items.length < 2) { setData([]); return; }
    let current = true;
    api<College[]>(`/colleges/compare?ids=${ids}`)
      .then(colleges => {
        if (!current) return;
        const order = ids.split(',');
        setData(colleges.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id)));
      })
      .catch(err => current && setMessage(err instanceof Error ? err.message : 'Could not load comparison'));
    return () => { current = false; };
  }, [ids, compare.items.length]);

  useEffect(() => {
    let current = true;
    const timer = setTimeout(() => {
      const params = new URLSearchParams({ limit: '8' });
      if (search.trim()) params.set('q', search.trim());
      api<{ items: College[] }>(`/colleges?${params}`).then(r => current && setResults(r.items)).catch(() => undefined);
    }, 250);
    return () => { current = false; clearTimeout(timer); };
  }, [search]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="eyebrow">Side by side</p>
      <h1 className="mt-2 text-4xl font-extrabold">Compare colleges</h1>
      <p className="mt-2 max-w-2xl text-sub">Pick up to {MAX_COMPARE} colleges. The best value in each row is highlighted.</p>

      {/* Selected slots */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {Array.from({ length: MAX_COMPARE }, (_, i) => compare.items[i]).map((item, i) => item ? (
          <div key={item.id} className="card flex items-center gap-3 p-4">
            <CollegeLogo college={item} size="sm" />
            <Link href={`/colleges/${item.slug}`} className="min-w-0 flex-1 truncate font-bold hover:underline">{item.name}</Link>
            <button onClick={() => compare.remove(item.id)} aria-label={`Remove ${item.name}`} className="rounded-lg p-1.5 text-faint hover:bg-muted hover:text-ink"><X className="h-4 w-4" /></button>
          </div>
        ) : (
          <div key={`empty-${i}`} className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line p-4 text-sm font-semibold text-faint">
            <Plus className="h-4 w-4" /> Add a college
          </div>
        ))}
      </div>

      {message && <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">{message}</p>}

      {/* Comparison table */}
      {data.length >= 2 ? (
        <div className="card mt-8 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="sticky left-0 w-48 bg-surface p-4 text-xs uppercase tracking-wide text-faint">Metric</th>
                {data.map(c => (
                  <th key={c.id} className="p-4 align-bottom">
                    <CollegeLogo college={c} size="xs" />
                    <Link href={`/colleges/${c.slug}`} className="mt-2 block font-display text-base font-bold hover:underline">{c.name}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ROWS.map(row => {
                const best = bestIds(row, data);
                return (
                  <tr key={row.label} className="hover:bg-muted/50">
                    <td className="sticky left-0 bg-surface p-4 font-semibold text-sub">{row.label}</td>
                    {data.map(c => (
                      <td key={c.id} className={`p-4 ${best.has(c.id) ? 'font-bold text-emerald-700 dark:text-emerald-400' : ''}`}>
                        <span className="inline-flex items-center gap-1.5">
                          {best.has(c.id) && <Check className="h-4 w-4" aria-label="Best" />}
                          {row.render(c)}
                        </span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card mt-8 flex flex-col items-center p-10 text-center">
          <Scale className="h-10 w-10 text-faint" />
          <h2 className="mt-3 text-xl font-bold">Add {2 - compare.items.length} more college{2 - compare.items.length === 1 ? '' : 's'} to compare</h2>
          <p className="mt-1 text-sub">Search below, or tap &ldquo;Compare&rdquo; on any college card.</p>
        </div>
      )}

      {/* Picker */}
      <section className="mt-10">
        <h2 className="text-xl font-bold">Add colleges</h2>
        <label className="relative mt-3 block">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <span className="sr-only">Search colleges to compare</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or city…" className="field h-12 pl-10" />
        </label>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {results.map(c => {
            const added = compare.has(c.id);
            return (
              <li key={c.id}>
                <button
                  onClick={() => setMessage(compare.toggle(c).message ?? '')}
                  aria-pressed={added}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${added ? 'border-brand-500 bg-brand-50 dark:bg-brand-500/10' : 'border-line bg-surface hover:border-brand-300'}`}
                >
                  <CollegeLogo college={c} size="xs" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{c.name}</span>
                    <span className="block truncate text-xs text-sub">{c.city}, {c.state}</span>
                  </span>
                  {added ? <Check className="h-4 w-4 text-brand-600" /> : <Plus className="h-4 w-4 text-faint" />}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

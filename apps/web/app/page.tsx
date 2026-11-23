'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CollegeCard } from '@/components/CollegeCard';
import { College, FiltersResponse, api } from '@/lib/api';

type CollegesResponse = { items: College[]; meta: { page: number; totalPages: number; total: number } };

const SORT_OPTIONS = [
  { value: 'nirf', label: 'NIRF rank' },
  { value: 'fees', label: 'Fees: low to high' },
  { value: 'placement', label: 'Placement %' },
  { value: 'package', label: 'Average package' },
  { value: 'rating', label: 'Student rating' },
  { value: 'name', label: 'Name (A–Z)' }
];

const FILTER_KEYS = ['q', 'state', 'type', 'course', 'maxFees', 'sort'] as const;
type FilterKey = (typeof FILTER_KEYS)[number];

const inputClass = 'rounded-xl border px-4 py-3 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500';

export default function HomePage() {
  return (
    <Suspense>
      <CollegeExplorer />
    </Suspense>
  );
}

function CollegeExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = Object.fromEntries(FILTER_KEYS.map(key => [key, searchParams.get(key) ?? ''])) as Record<FilterKey, string>;
  const page = Math.max(Number(searchParams.get('page')) || 1, 1);

  const [search, setSearch] = useState(filters.q);
  const [options, setOptions] = useState<FiltersResponse>({ states: [], types: [], exams: [], courses: [] });
  const [colleges, setColleges] = useState<College[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  function update(changes: Partial<Record<FilterKey | 'page', string>>) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    if (!('page' in changes)) params.delete('page');
    router.replace(`${pathname}?${params}`, { scroll: false });
  }

  // Debounce the free-text search so we don't hit the API on every keystroke.
  useEffect(() => {
    if (search === filters.q) return;
    const timer = setTimeout(() => update({ q: search }), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    api<FiltersResponse>('/colleges/filters').then(setOptions).catch(() => undefined);
  }, []);

  const query = searchParams.toString();
  useEffect(() => {
    setLoading(true);
    setError('');
    const params = new URLSearchParams(query);
    params.set('limit', '9');
    api<CollegesResponse>(`/colleges?${params}`)
      .then(data => {
        setColleges(data.items);
        setTotal(data.meta.total);
        setTotalPages(data.meta.totalPages || 1);
      })
      .catch(err => setError(err instanceof Error ? err.message : 'Failed to load colleges'))
      .finally(() => setLoading(false));
  }, [query]);

  const hasFilters = FILTER_KEYS.some(key => key !== 'sort' && filters[key]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-slate-900 p-8 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">Engineering colleges across India</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-extrabold md:text-4xl">Find the right college before you commit four years to it.</h1>
        <p className="mt-4 max-w-2xl text-blue-100">
          Compare NIRF rankings, fees, placements, hostels and campus life, and read what students actually say.
        </p>
      </section>

      <section className="mt-8 rounded-2xl border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-6">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by college or city"
            aria-label="Search by college or city"
            className={`${inputClass} md:col-span-2`}
          />
          <select aria-label="State" value={filters.state} onChange={e => update({ state: e.target.value })} className={inputClass}>
            <option value="">All states</option>
            {options.states.map(item => <option key={item}>{item}</option>)}
          </select>
          <select aria-label="Institute type" value={filters.type} onChange={e => update({ type: e.target.value })} className={inputClass}>
            <option value="">All types</option>
            {options.types.map(item => <option key={item}>{item}</option>)}
          </select>
          <select aria-label="Course" value={filters.course} onChange={e => update({ course: e.target.value })} className={inputClass}>
            <option value="">All courses</option>
            {options.courses.map(item => <option key={item}>{item}</option>)}
          </select>
          <input
            aria-label="Maximum fees per year"
            value={filters.maxFees}
            onChange={e => update({ maxFees: e.target.value })}
            type="number"
            min="0"
            placeholder="Max fees / year"
            className={inputClass}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-slate-600 dark:text-slate-400">
            {loading ? 'Searching…' : `${total} college${total === 1 ? '' : 's'} found`}
            {hasFilters && (
              <button onClick={() => { setSearch(''); router.replace(pathname, { scroll: false }); }} className="ml-3 font-semibold text-blue-600 hover:underline dark:text-blue-400">
                Clear filters
              </button>
            )}
          </p>
          <label className="flex items-center gap-2">
            <span className="text-slate-600 dark:text-slate-400">Sort by</span>
            <select value={filters.sort || 'nirf'} onChange={e => update({ sort: e.target.value === 'nirf' ? '' : e.target.value })} className="rounded-lg border px-3 py-2 dark:border-slate-800 dark:bg-slate-950">
              {SORT_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
        </div>
      </section>

      {error && <p className="mt-8 rounded-xl bg-red-50 p-6 text-center text-red-700 dark:bg-red-950/30 dark:text-red-400">{error}</p>}
      {!loading && !error && colleges.length === 0 && (
        <p className="mt-8 rounded-xl bg-white p-6 text-center shadow-sm dark:bg-slate-900">No colleges match these filters. Try removing one.</p>
      )}

      <section className={`mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3 ${loading ? 'opacity-60' : ''}`}>
        {colleges.map(college => <CollegeCard key={college.id} college={college} />)}
      </section>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button disabled={page <= 1} onClick={() => update({ page: String(page - 1) })} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">Previous</button>
          <span className="font-semibold">Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => update({ page: String(page + 1) })} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">Next</button>
        </div>
      )}
    </main>
  );
}

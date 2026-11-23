'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BadgeCheck, Building2, Home, IndianRupee, Landmark, MapPin, MessageSquareText, Search, SlidersHorizontal, Trophy, Wallet, X } from 'lucide-react';
import { CollegeCard, CollegeCardSkeleton } from '@/components/CollegeCard';
import { College, FiltersResponse, api } from '@/lib/api';

type CollegesResponse = { items: College[]; meta: { page: number; totalPages: number; total: number } };

const SORT_OPTIONS = [
  { value: 'nirf', label: 'NIRF rank' },
  { value: 'fees', label: 'Lowest fees' },
  { value: 'placement', label: 'Placement %' },
  { value: 'package', label: 'Highest pay' },
  { value: 'rating', label: 'Student rating' },
  { value: 'name', label: 'Name (A–Z)' }
];

const FILTER_KEYS = ['q', 'state', 'type', 'course', 'maxFees', 'sort'] as const;
type FilterKey = (typeof FILTER_KEYS)[number];
type Changes = Partial<Record<FilterKey | 'page', string>>;

const QUICK_FILTERS: { label: string; icon: typeof Trophy; changes: Changes }[] = [
  { label: 'IITs', icon: Landmark, changes: { type: 'IIT' } },
  { label: 'NITs', icon: Building2, changes: { type: 'NIT' } },
  { label: 'Under ₹1.5L / year', icon: IndianRupee, changes: { maxFees: '150000', sort: 'fees' } },
  { label: 'Tamil Nadu', icon: MapPin, changes: { state: 'Tamil Nadu' } },
  { label: 'Karnataka', icon: MapPin, changes: { state: 'Karnataka' } },
  { label: 'Best placements', icon: Trophy, changes: { sort: 'placement' } }
];

const CHECKS = [
  { icon: Trophy, title: 'NIRF rank', text: 'The government ranking, and how it has moved' },
  { icon: Wallet, title: 'Median salary', text: 'More honest than the "highest package"' },
  { icon: Home, title: 'Hostel & total cost', text: 'Tuition plus hostel, mess and extras' },
  { icon: MessageSquareText, title: 'Real student reviews', text: 'What it is actually like to study there' }
];

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
  const pushedSearch = useRef(filters.q);
  const [options, setOptions] = useState<FiltersResponse>({ states: [], types: [], exams: [], courses: [] });
  const [colleges, setColleges] = useState<College[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const resultsRef = useRef<HTMLElement>(null);

  function update(changes: Changes, scroll = false) {
    // Read the live URL, not the `searchParams` captured at render time: the debounced
    // search calls this later, and a stale copy would wipe filters changed in between.
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    if (!('page' in changes)) params.delete('page');
    router.replace(`${pathname}?${params}`, { scroll: false });
    if (scroll) resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Debounce the free-text search so we don't hit the API on every keystroke.
  useEffect(() => {
    if (search === filters.q) return;
    const timer = setTimeout(() => {
      pushedSearch.current = search;
      update({ q: search });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // Sync the box when the URL's search changes from elsewhere (Clear filters, browser back),
  // but never overwrite what the user is typing.
  useEffect(() => {
    if (filters.q === pushedSearch.current) return;
    pushedSearch.current = filters.q;
    setSearch(filters.q);
  }, [filters.q]);

  useEffect(() => {
    api<FiltersResponse>('/colleges/filters').then(setOptions).catch(() => undefined);
  }, []);

  const query = searchParams.toString();
  useEffect(() => {
    // Ignore responses from older requests so a slow earlier search can't overwrite newer results.
    let current = true;
    setLoading(true);
    setError('');
    const params = new URLSearchParams(query);
    params.set('limit', '9');
    api<CollegesResponse>(`/colleges?${params}`)
      .then(data => {
        if (!current) return;
        setColleges(data.items);
        setTotal(data.meta.total);
        setTotalPages(data.meta.totalPages || 1);
      })
      .catch(err => { if (current) setError(err instanceof Error ? err.message : 'Failed to load colleges'); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [query]);

  const activeFilters = ([
    filters.q && { key: 'q', label: `“${filters.q}”` },
    filters.state && { key: 'state', label: filters.state },
    filters.type && { key: 'type', label: filters.type },
    filters.course && { key: 'course', label: filters.course },
    filters.maxFees && { key: 'maxFees', label: `Up to ₹${Number(filters.maxFees).toLocaleString('en-IN')}` }
  ].filter(Boolean) as { key: FilterKey; label: string }[]);

  function clearAll() {
    pushedSearch.current = '';
    setSearch('');
    router.replace(pathname, { scroll: false });
  }

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_30rem_at_10%_-10%,theme(colors.brand.200/.6),transparent),radial-gradient(40rem_24rem_at_100%_0%,theme(colors.amber.200/.45),transparent)] dark:bg-[radial-gradient(60rem_30rem_at_10%_-10%,theme(colors.brand.900/.55),transparent),radial-gradient(40rem_24rem_at_100%_0%,theme(colors.amber.900/.25),transparent)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-12 md:pb-16 md:pt-20 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0">
          <p className="eyebrow">Engineering colleges across India</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.05] md:text-6xl">
            Find a college you&apos;ll be <span className="text-brand-600 dark:text-brand-300">glad you chose.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-sub">
            Compare NIRF rankings, fees, placements, hostels and campus life, and read what students actually say before you commit four years.
          </p>

          <form
            role="search"
            onSubmit={e => { e.preventDefault(); pushedSearch.current = search; update({ q: search }, true); }}
            className="mt-8 flex max-w-3xl flex-col gap-2 rounded-2xl border border-line bg-surface p-2 shadow-lift sm:flex-row"
          >
            <label className="flex flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 shrink-0 text-faint" />
              <span className="sr-only">Search by college or city</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search a college or city, e.g. IIT, Chennai"
                className="h-12 w-full bg-transparent text-base placeholder:text-faint focus:outline-none"
              />
            </label>
            <label className="flex items-center gap-2 border-line px-3 sm:border-l">
              <MapPin className="h-4 w-4 shrink-0 text-faint" />
              <span className="sr-only">State</span>
              <select value={filters.state} onChange={e => update({ state: e.target.value })} className="h-12 w-full bg-transparent text-sm font-medium focus:outline-none sm:w-44">
                <option value="">All states</option>
                {options.states.map(item => <option key={item}>{item}</option>)}
              </select>
            </label>
            <button className="btn-primary h-12 px-6 text-base">Search</button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {QUICK_FILTERS.map(({ label, icon: Icon, changes }) => (
              <button
                key={label}
                onClick={() => update(changes, true)}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-sm font-medium text-sub backdrop-blur transition hover:border-brand-300 hover:text-ink"
              >
                <Icon className="h-3.5 w-3.5" /> {label}
              </button>
            ))}
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            <HeroStat value={options.states.length ? `${options.states.length}` : '—'} label="States & UTs" />
            <HeroStat value={options.types.length ? `${options.types.length}` : '—'} label="Institute types" />
            <HeroStat value="100%" label="Free for students" />
          </dl>
          </div>

          <aside className="hidden rounded-3xl border border-line bg-surface/90 p-6 shadow-lift backdrop-blur lg:block">
            <p className="flex items-center gap-2 text-sm font-bold"><BadgeCheck className="h-5 w-5 text-emerald-500" /> Before you join, check</p>
            <ul className="mt-4 space-y-3">
              {CHECKS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-3 rounded-2xl bg-muted p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface text-brand-600 shadow-sm dark:text-brand-300"><Icon className="h-4 w-4" /></span>
                  <span>
                    <span className="block text-sm font-bold">{title}</span>
                    <span className="block text-xs leading-5 text-sub">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Results */}
      <section ref={resultsRef} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              {filters.state ? `Colleges in ${filters.state}` : filters.type ? `${filters.type} colleges` : 'Explore colleges'}
            </h2>
            <p className="mt-1 text-sub" aria-live="polite">
              {loading ? 'Searching…' : `${total} college${total === 1 ? '' : 's'} found`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <SlidersHorizontal className="hidden h-4 w-4 text-faint md:block" />
            <select aria-label="Institute type" value={filters.type} onChange={e => update({ type: e.target.value })} className="field h-10 w-auto">
              <option value="">All types</option>
              {options.types.map(item => <option key={item}>{item}</option>)}
            </select>
            <select aria-label="Course" value={filters.course} onChange={e => update({ course: e.target.value })} className="field h-10 w-auto max-w-[12rem]">
              <option value="">All courses</option>
              {options.courses.map(item => <option key={item}>{item}</option>)}
            </select>
            <input
              aria-label="Maximum fees per year"
              value={filters.maxFees}
              onChange={e => update({ maxFees: e.target.value })}
              type="number"
              min="0"
              step="10000"
              placeholder="Max fees / yr"
              className="field h-10 w-36"
            />
            <select aria-label="Sort by" value={filters.sort || 'nirf'} onChange={e => update({ sort: e.target.value === 'nirf' ? '' : e.target.value })} className="field h-10 w-auto font-medium">
              {SORT_OPTIONS.map(option => <option key={option.value} value={option.value}>Sort: {option.label}</option>)}
            </select>
          </div>
        </div>

        {activeFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeFilters.map(filter => (
              <button
                key={filter.key}
                onClick={() => { if (filter.key === 'q') { pushedSearch.current = ''; setSearch(''); } update({ [filter.key]: '' }); }}
                className="chip bg-brand-50 py-1.5 pl-3 pr-2 text-brand-800 hover:bg-brand-100 dark:bg-brand-500/15 dark:text-brand-200"
              >
                {filter.label} <X className="h-3.5 w-3.5" aria-label="Remove filter" />
              </button>
            ))}
            <button onClick={clearAll} className="text-sm font-semibold text-sub underline-offset-4 hover:text-ink hover:underline">Clear all</button>
          </div>
        )}

        {error && <p className="card mt-8 border-rose-200 bg-rose-50 p-6 text-center text-rose-700 dark:border-rose-900 dark:bg-rose-950/30 dark:text-rose-300">{error}</p>}

        {!loading && !error && colleges.length === 0 && (
          <div className="card mt-8 flex flex-col items-center p-12 text-center">
            <Search className="h-10 w-10 text-faint" />
            <h3 className="mt-4 text-xl font-bold">No colleges match these filters</h3>
            <p className="mt-1 text-sub">Try removing a filter or searching for a city instead.</p>
            <button onClick={clearAll} className="btn-secondary mt-5">Clear all filters</button>
          </div>
        )}

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading && colleges.length === 0
            ? Array.from({ length: 6 }, (_, i) => <CollegeCardSkeleton key={i} />)
            : colleges.map((college, i) => (
                <div key={college.id} className={`animate-fade-up ${loading ? 'opacity-60' : ''}`} style={{ animationDelay: `${i * 40}ms` }}>
                  <CollegeCard college={college} />
                </div>
              ))}
        </div>

        {totalPages > 1 && (
          <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-3">
            <button disabled={page <= 1} onClick={() => update({ page: String(page - 1) }, true)} className="btn-secondary">Previous</button>
            <span className="px-2 text-sm font-semibold text-sub">Page {page} of {totalPages}</span>
            <button disabled={page >= totalPages} onClick={() => update({ page: String(page + 1) }, true)} className="btn-secondary">Next</button>
          </nav>
        )}
      </section>
    </main>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-3xl font-extrabold">{value}</dd>
      <dd className="text-sm text-sub">{label}</dd>
    </div>
  );
}

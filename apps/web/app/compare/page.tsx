'use client';

import { useEffect, useState } from 'react';
import { CollegeCard } from '@/components/CollegeCard';
import { College, api, formatFees, formatLpa, formatPercent } from '@/lib/api';

export default function ComparePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [selected, setSelected] = useState<College[]>([]);
  const [compareData, setCompareData] = useState<College[]>([]);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams({ limit: '12' });
      if (search.trim()) params.set('q', search.trim());
      api<{ items: College[] }>(`/colleges?${params}`)
        .then(data => setColleges(data.items))
        .catch(err => setError(err instanceof Error ? err.message : 'Failed to load colleges'));
    }, 250);
    return () => clearTimeout(timer);
  }, [search]);

  function toggle(college: College) {
    setError('');
    setSelected(current => {
      if (current.some(c => c.id === college.id)) return current.filter(c => c.id !== college.id);
      if (current.length >= 3) {
        setError('You can compare maximum 3 colleges.');
        return current;
      }
      return [...current, college];
    });
  }

  async function compare() {
    if (selected.length < 2) {
      setError('Select at least 2 colleges to compare.');
      return;
    }
    try {
      const data = await api<College[]>(`/colleges/compare?ids=${selected.map(c => c.id).join(',')}`);
      setCompareData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Compare failed');
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Compare Colleges</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Select 2–3 colleges and compare decision-making metrics.</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
        <p className="font-semibold">Selected: {selected.map(c => c.name).join(', ') || 'None'}</p>
        <button onClick={compare} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">Compare now</button>
        {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
      </div>

      {compareData.length > 0 && (
        <section className="mt-8 overflow-x-auto rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead><tr className="border-b bg-slate-50 dark:border-slate-800 dark:bg-slate-800"><th className="p-3">Metric</th>{compareData.map(c => <th key={c.id} className="p-3">{c.name}</th>)}</tr></thead>
            <tbody>
              {ROWS.map(([label, render]) => (
                <tr key={label} className="border-b last:border-0 dark:border-slate-800">
                  <td className="p-3 font-semibold">{label}</td>
                  {compareData.map(c => <td key={c.id} className="p-3">{render(c)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search colleges to add…"
        aria-label="Search colleges to compare"
        className="mt-8 w-full rounded-xl border px-4 py-3 dark:border-slate-800 dark:bg-slate-950"
      />

      <section className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {colleges.map(college => <CollegeCard key={college.id} college={college} selectable selected={selected.some(c => c.id === college.id)} onToggle={toggle} />)}
      </section>
    </main>
  );
}

const ROWS: [string, (c: College) => React.ReactNode][] = [
  ['NIRF rank', c => (c.nirfRank ? `#${c.nirfRank}${c.nirfYear ? ` (${c.nirfYear})` : ''}` : '—')],
  ['Type', c => `${c.type} · ${c.ownership}`],
  ['Location', c => `${c.city}, ${c.state}`],
  ['Established', c => c.established ?? '—'],
  ['Entrance exam', c => c.exam],
  ['Tuition / year', c => formatFees(c.fees)],
  ['Hostel + mess / year', c => formatFees(c.hostelFees)],
  ['Placement %', c => formatPercent(c.placementRate)],
  ['Average package', c => formatLpa(c.averagePackage)],
  ['Median package', c => formatLpa(c.medianPackage)],
  ['Campus size', c => (c.campusAcres ? `${c.campusAcres} acres` : '—')],
  ['Hostel', c => (c.hostelAvailable ? 'Yes' : 'No')],
  ['Student rating', c => (c.rating != null ? `⭐ ${c.rating} (${c.reviewCount})` : 'No reviews yet')],
  ['Courses', c => c.courses?.map(x => x.name).join(', ') || '—']
];

'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ApiError, College, api, formatFees, formatLpa, formatPercent } from '@/lib/api';

type Props = {
  college: College;
  selectable?: boolean;
  selected?: boolean;
  onToggle?: (college: College) => void;
  onRemoved?: (collegeId: string) => void;
  savedView?: boolean;
};

export function CollegeCard({ college, selectable, selected, onToggle, onRemoved, savedView }: Props) {
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function saveCollege() {
    setBusy(true);
    setMessage('');
    try {
      if (savedView) {
        await api(`/saved/${college.id}`, { method: 'DELETE' });
        onRemoved?.(college.id);
        return;
      }
      await api(`/saved/${college.id}`, { method: 'POST' });
      setMessage('Saved');
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) setMessage('Login first to save colleges.');
      else setMessage(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <article className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            {college.nirfRank && (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                NIRF #{college.nirfRank}{college.nirfYear ? ` · ${college.nirfYear}` : ''}
              </span>
            )}
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300">{college.type}</span>
          </div>
          <h3 className="mt-2 text-lg font-bold text-slate-950 dark:text-slate-100">{college.name}</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">📍 {college.city}, {college.state}</p>
        </div>
        {college.rating != null && (
          <span title={`${college.reviewCount} student review${college.reviewCount === 1 ? '' : 's'}`} className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-300">
            ⭐ {college.rating}
          </span>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <Stat label="Fees / year" value={formatFees(college.fees)} />
        <Stat label="Placement" value={formatPercent(college.placementRate)} />
        <Stat label="Avg package" value={formatLpa(college.averagePackage)} />
        <Stat label="Exam" value={college.exam} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Link href={`/colleges/${college.slug}`} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">View details</Link>
        <button disabled={busy} onClick={saveCollege} className="rounded-lg border px-4 py-2 text-sm font-semibold disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800">
          {savedView ? 'Remove' : 'Save'}
        </button>
        {selectable && <button onClick={() => onToggle?.(college)} className={`rounded-lg px-4 py-2 text-sm font-semibold ${selected ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900' : 'border dark:border-slate-700 dark:hover:bg-slate-800'}`}>{selected ? 'Selected' : 'Compare'}</button>}
        {message && <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{message}</span>}
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
      <p className="text-slate-500 dark:text-slate-400">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

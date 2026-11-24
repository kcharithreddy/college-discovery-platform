'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AlertTriangle, ArrowUpRight, Check, Heart, MapPin, Plus, Star, Trash2, Trophy } from 'lucide-react';
import { CollegeLogo } from '@/components/CollegeLogo';
import { useCompare } from '@/components/CompareProvider';
import { ApiError, College, api, formatLakh, formatPercent, isUnverified, NOT_AVAILABLE } from '@/lib/api';

type Props = {
  college: College;
  onRemoved?: (collegeId: string) => void;
  savedView?: boolean;
};

export function CollegeCard({ college, onRemoved, savedView }: Props) {
  const compare = useCompare();
  const inCompare = compare.has(college.id);
  const [saved, setSaved] = useState(Boolean(savedView));
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function toggleSave() {
    setBusy(true);
    setMessage('');
    try {
      if (saved) {
        await api(`/saved/${college.id}`, { method: 'DELETE' });
        setSaved(false);
        onRemoved?.(college.id);
      } else {
        await api(`/saved/${college.id}`, { method: 'POST' });
        setSaved(true);
      }
    } catch (err) {
      setMessage(err instanceof ApiError && err.status === 401 ? 'Log in to save colleges' : err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  }

  function toggleCompare() {
    const result = compare.toggle(college);
    setMessage(result.ok ? '' : result.message ?? '');
  }

  const pay = college.medianPackage ?? college.averagePackage;
  const payLabel = college.medianPackage != null ? 'Median pay' : 'Avg pay';

  return (
    <article className="card group relative flex flex-col p-5 transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-lift dark:hover:border-brand-800">
      <div className="flex items-start justify-between gap-3">
        <CollegeLogo college={college} />
        <div className="flex flex-wrap justify-end gap-1.5">
          {college.nirfRank && (
            <span className="chip bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-300">
              <Trophy className="h-3 w-3" /> NIRF #{college.nirfRank}
            </span>
          )}
          <span className="chip bg-muted text-sub">{college.type}</span>
          {isUnverified(college) && (
            <span title="These figures are sample values that haven't been checked against official sources yet" className="chip bg-amber-50 text-amber-800 dark:bg-amber-400/10 dark:text-amber-300">
              <AlertTriangle className="h-3 w-3" /> Unverified
            </span>
          )}
        </div>
      </div>

      <h3 className="mt-4 text-lg font-bold leading-snug">
        <Link href={`/colleges/${college.slug}`} className="after:absolute after:inset-0 after:rounded-2xl focus:outline-none">
          {college.name}
        </Link>
      </h3>
      <p className="mt-1 flex items-center gap-1 text-sm text-sub">
        <MapPin className="h-3.5 w-3.5 shrink-0" /> {college.city}, {college.state}
        {college.rating != null && (
          <span className="ml-auto flex items-center gap-1 font-semibold text-ink">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {college.rating}
            <span className="font-normal text-faint">({college.reviewCount})</span>
          </span>
        )}
      </p>

      <dl className="mt-4 grid grid-cols-3 divide-x divide-line rounded-xl bg-muted py-3 text-center">
        <Metric label="Fees / yr" value={formatLakh(college.fees)} />
        <Metric label="Placed" value={formatPercent(college.placementRate)} />
        <Metric label={payLabel} value={pay != null ? `₹${pay}L` : NOT_AVAILABLE} />
      </dl>

      {/* Buttons sit above the full-card link */}
      <div className="relative z-10 mt-4 flex items-center gap-2">
        <button
          onClick={toggleSave}
          disabled={busy}
          aria-pressed={saved}
          className={`btn-secondary h-9 px-3 ${saved ? 'border-rose-200 text-rose-600 dark:border-rose-900 dark:text-rose-400' : ''}`}
        >
          {savedView ? <Trash2 className="h-4 w-4" /> : <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />}
          {savedView ? 'Remove' : saved ? 'Saved' : 'Save'}
        </button>
        <button onClick={toggleCompare} aria-pressed={inCompare} className={`h-9 px-3 ${inCompare ? 'btn-primary' : 'btn-secondary'}`}>
          {inCompare ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />} Compare
        </button>
        <Link href={`/colleges/${college.slug}`} aria-label={`View ${college.name}`} className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl text-faint transition group-hover:bg-brand-600 group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      {message && <p role="status" className="relative z-10 mt-2 text-xs font-medium text-rose-600 dark:text-rose-400">{message}</p>}
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  const missing = value === NOT_AVAILABLE;
  return (
    <div className="px-2">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-faint">{label}</dt>
      <dd className={`mt-0.5 truncate text-sm font-bold ${missing ? 'font-medium text-faint' : ''}`}>{missing ? 'N/A' : value}</dd>
    </div>
  );
}

export function CollegeCardSkeleton() {
  return (
    <div className="card animate-pulse p-5" aria-hidden>
      <div className="flex justify-between"><div className="h-11 w-24 rounded-xl bg-muted" /><div className="h-6 w-16 rounded-full bg-muted" /></div>
      <div className="mt-4 h-5 w-3/4 rounded bg-muted" />
      <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
      <div className="mt-4 h-16 rounded-xl bg-muted" />
      <div className="mt-4 flex gap-2"><div className="h-9 w-20 rounded-xl bg-muted" /><div className="h-9 w-24 rounded-xl bg-muted" /></div>
    </div>
  );
}

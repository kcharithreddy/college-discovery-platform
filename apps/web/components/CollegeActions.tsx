'use client';

import { useState } from 'react';
import { Check, Heart, Plus } from 'lucide-react';
import { useCompare } from '@/components/CompareProvider';
import { ApiError, College, api } from '@/lib/api';

/** Save + Compare buttons for the college page header. */
export function CollegeActions({ college }: { college: Pick<College, 'id' | 'name' | 'slug' | 'logo'> }) {
  const compare = useCompare();
  const inCompare = compare.has(college.id);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function save() {
    setBusy(true);
    setMessage('');
    try {
      await api(`/saved/${college.id}`, { method: saved ? 'DELETE' : 'POST' });
      setSaved(!saved);
    } catch (err) {
      setMessage(err instanceof ApiError && err.status === 401 ? 'Log in to save colleges' : 'Could not save, please try again');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 md:items-end">
      <div className="flex gap-2">
        <button onClick={save} disabled={busy} aria-pressed={saved} className={`btn-secondary ${saved ? 'text-rose-600 dark:text-rose-400' : ''}`}>
          <Heart className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} /> {saved ? 'Saved' : 'Save'}
        </button>
        <button
          onClick={() => setMessage(compare.toggle(college).message ?? '')}
          aria-pressed={inCompare}
          className={inCompare ? 'btn-primary' : 'btn-secondary'}
        >
          {inCompare ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />} {inCompare ? 'Added to compare' : 'Compare'}
        </button>
      </div>
      {message && <p role="status" className="text-xs font-medium text-rose-600 dark:text-rose-400">{message}</p>}
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ApiError, Review, api, getToken } from '@/lib/api';

const ASPECTS = [
  ['academics', 'Academics'],
  ['infrastructure', 'Infrastructure'],
  ['campusLife', 'Campus life'],
  ['placements', 'Placements']
] as const;

type Aspect = (typeof ASPECTS)[number][0];

const field = 'mt-1 w-full rounded-xl border border-line px-4 py-2.5 text-sm';

export function ReviewSection({ collegeId, reviews }: { collegeId: string; reviews: Review[] }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => setLoggedIn(Boolean(getToken())), []);

  const averages = ASPECTS.map(([key, label]) => {
    const values = reviews.map(r => r[key]).filter((v): v is number => v != null);
    return { label, value: values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1) : null };
  });

  return (
    <div>
      {reviews.length > 0 && (
        <div className="mb-5 grid gap-3 sm:grid-cols-4">
          {averages.map(a => (
            <div key={a.label} className="rounded-2xl bg-muted p-3 text-center">
              <p className="text-xs text-faint">{a.label}</p>
              <p className="text-lg font-bold">{a.value ? `⭐ ${a.value}` : '—'}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sub">
          {reviews.length === 0 ? 'No reviews yet. If you study or studied here, help the next batch by writing the first one.' : `${reviews.length} review${reviews.length === 1 ? '' : 's'} from students`}
        </p>
        {loggedIn ? (
          <button onClick={() => setShowForm(v => !v)} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            {showForm ? 'Cancel' : 'Write a review'}
          </button>
        ) : (
          <Link href="/auth" className="rounded-lg border border-line px-4 py-2 text-sm font-semibold">Log in to write a review</Link>
        )}
      </div>

      {showForm && <ReviewForm collegeId={collegeId} onDone={() => setShowForm(false)} />}

      <div className="mt-5 grid gap-4">
        {reviews.map(r => (
          <article key={r.id} className="rounded-2xl border border-line p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-bold">{r.title}</h3>
              <span className="text-sm font-semibold text-green-700 dark:text-green-400">⭐ {r.rating}/5</span>
            </div>
            <p className="mt-1 text-xs text-faint">
              {r.user?.name ?? 'Student'}{r.graduationYear ? ` · Class of ${r.graduationYear}` : ''} · {new Date(r.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
            </p>
            <p className="mt-3 whitespace-pre-line leading-7 text-sub">{r.comment}</p>
            {(r.pros || r.cons) && (
              <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                {r.pros && <p className="rounded-xl bg-green-50 p-3 dark:bg-green-950/40"><strong>Liked:</strong> {r.pros}</p>}
                {r.cons && <p className="rounded-xl bg-amber-50 p-3 dark:bg-amber-950/40"><strong>Could be better:</strong> {r.cons}</p>}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

function ReviewForm({ collegeId, onDone }: { collegeId: string; onDone: () => void }) {
  const router = useRouter();
  const [rating, setRating] = useState(4);
  const [aspects, setAspects] = useState<Partial<Record<Aspect, number>>>({});
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api(`/colleges/${collegeId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
          rating, ...aspects, title, comment,
          pros: pros || undefined,
          cons: cons || undefined,
          graduationYear: graduationYear || undefined
        })
      });
      onDone();
      router.refresh();
    } catch (err) {
      setError(err instanceof ApiError && err.status === 401 ? 'Your session expired. Please log in again.' : err instanceof Error ? err.message : 'Could not save review');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-5 space-y-4 rounded-2xl border border-line p-4">
      <div className="grid gap-3 sm:grid-cols-5">
        <Stars label="Overall" value={rating} onChange={setRating} />
        {ASPECTS.map(([key, label]) => (
          <Stars key={key} label={label} value={aspects[key]} onChange={v => setAspects(a => ({ ...a, [key]: v }))} />
        ))}
      </div>
      <label className="block text-sm font-semibold">Title
        <input required minLength={3} maxLength={120} value={title} onChange={e => setTitle(e.target.value)} placeholder="Sum up your experience" className={field} />
      </label>
      <label className="block text-sm font-semibold">Your experience
        <textarea required minLength={20} maxLength={3000} rows={5} value={comment} onChange={e => setComment(e.target.value)} placeholder="Teaching, hostel, food, clubs, placements: what should a new student know?" className={field} />
      </label>
      <div className="grid gap-3 md:grid-cols-3">
        <label className="block text-sm font-semibold">What you liked
          <input maxLength={1000} value={pros} onChange={e => setPros(e.target.value)} className={field} />
        </label>
        <label className="block text-sm font-semibold">What could be better
          <input maxLength={1000} value={cons} onChange={e => setCons(e.target.value)} className={field} />
        </label>
        <label className="block text-sm font-semibold">Graduation year
          <input type="number" min={1950} max={2040} value={graduationYear} onChange={e => setGraduationYear(e.target.value)} className={field} />
        </label>
      </div>
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      <button disabled={busy} className="rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60">
        {busy ? 'Saving…' : 'Publish review'}
      </button>
    </form>
  );
}

function Stars({ label, value, onChange }: { label: string; value?: number; onChange: (v: number) => void }) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold text-sub">{label}</legend>
      <div className="mt-1 flex">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            aria-label={`${label}: ${n} star${n > 1 ? 's' : ''}`}
            onClick={() => onChange(n)}
            className={`text-xl ${value && n <= value ? 'text-amber-400' : 'text-line'}`}
          >
            ★
          </button>
        ))}
      </div>
    </fieldset>
  );
}

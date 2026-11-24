'use client';

import { useEffect, useState } from 'react';
import { Info, Sparkles, Target } from 'lucide-react';
import { CollegeCard, CollegeCardSkeleton } from '@/components/CollegeCard';
import { College, FiltersResponse, api } from '@/lib/api';

export default function PredictorPage() {
  const [exams, setExams] = useState<string[]>(['JEE']);
  const [exam, setExam] = useState('JEE');
  const [rank, setRank] = useState('');
  const [matches, setMatches] = useState<College[] | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<FiltersResponse>('/colleges/filters')
      .then(data => { if (data.exams.length) setExams(data.exams); })
      .catch(() => undefined);
  }, []);

  async function predict(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    setBusy(true);
    try {
      const data = await api<{ matches: College[] }>('/colleges/predict', {
        method: 'POST',
        body: JSON.stringify({ exam, rank: Number(rank) })
      });
      setMatches(data.matches);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Prediction failed');
      setMatches(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-brand-950 p-8 text-white shadow-lift md:p-12">
        <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-brand-100"><Target className="h-4 w-4" /> College predictor</p>
        <h1 className="mt-3 max-w-2xl text-4xl font-extrabold md:text-5xl">Which colleges can I get with my rank?</h1>
        <p className="mt-3 max-w-xl text-brand-100">Enter your exam and rank. We match it against the rank ranges we have for each college.</p>

        <form onSubmit={predict} className="mt-8 grid max-w-2xl gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur sm:grid-cols-[1fr_1fr_auto]">
          <label>
            <span className="sr-only">Exam</span>
            <select value={exam} onChange={e => setExam(e.target.value)} className="h-12 w-full rounded-xl border-0 bg-white px-4 font-semibold text-slate-900 focus:ring-4 focus:ring-white/30">
              {exams.map(item => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Your rank</span>
            <input value={rank} onChange={e => setRank(e.target.value)} required type="number" min="1" placeholder="Your rank, e.g. 2500" className="h-12 w-full rounded-xl border-0 bg-white px-4 font-semibold text-slate-900 placeholder:font-normal placeholder:text-slate-400 focus:ring-4 focus:ring-white/30" />
          </label>
          <button disabled={busy} className="btn h-12 bg-amber-400 px-6 text-base text-slate-900 hover:bg-amber-300">
            <Sparkles className="h-4 w-4" /> {busy ? 'Checking…' : 'Predict'}
          </button>
        </form>
      </div>

      <p className="mt-4 flex items-start gap-2 text-sm text-sub">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        Cutoffs change every year and differ by branch, category and quota. Treat this as a starting point and check official JoSAA or counselling closing ranks.
      </p>

      {message && <p className="card mt-6 border-rose-200 p-4 text-rose-700 dark:border-rose-900 dark:text-rose-300">{message}</p>}

      {busy && <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }, (_, i) => <CollegeCardSkeleton key={i} />)}</div>}

      {!busy && matches && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold">
            {matches.length ? `${matches.length} possible college${matches.length === 1 ? '' : 's'} for ${exam} rank ${Number(rank).toLocaleString('en-IN')}` : 'No matches for this rank yet'}
          </h2>
          {matches.length === 0 && <p className="mt-2 text-sub">Try another exam, or a nearby rank. We only have rank ranges for some colleges so far.</p>}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matches.map(college => <CollegeCard key={college.id} college={college} />)}
          </div>
        </section>
      )}
    </main>
  );
}

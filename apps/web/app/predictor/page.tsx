'use client';

import { useEffect, useState } from 'react';
import { CollegeCard } from '@/components/CollegeCard';
import { College, FiltersResponse, api } from '@/lib/api';

export default function PredictorPage() {
  const [exams, setExams] = useState<string[]>(['JEE']);
  const [exam, setExam] = useState('JEE');
  const [rank, setRank] = useState('1000');
  const [matches, setMatches] = useState<College[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api<FiltersResponse>('/colleges/filters')
      .then(data => { if (data.exams.length) setExams(data.exams); })
      .catch(() => undefined);
  }, []);

  async function predict(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');
    try {
      const data = await api<{ matches: College[] }>('/colleges/predict', {
        method: 'POST',
        body: JSON.stringify({ exam, rank: Number(rank) })
      });
      setMatches(data.matches);
      if (data.matches.length === 0) setMessage('No colleges matched this rank. Try a different exam/rank.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Prediction failed');
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Simple College Predictor</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Enter exam and rank. The backend checks stored rank ranges and returns possible colleges.</p>

      <form onSubmit={predict} className="mt-6 grid gap-4 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-3 dark:bg-slate-900">
        <select value={exam} onChange={e => setExam(e.target.value)} className="rounded-xl border px-4 py-3 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
          {exams.map(item => <option key={item}>{item}</option>)}
        </select>
        <input value={rank} onChange={e => setRank(e.target.value)} type="number" min="1" className="rounded-xl border px-4 py-3 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500" />
        <button className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700">Predict colleges</button>
      </form>

      {message && <p className="mt-6 rounded-xl bg-yellow-50 p-4 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-500">{message}</p>}
      <section className="mt-8 grid gap-5 md:grid-cols-2">
        {matches.map(college => <CollegeCard key={college.id} college={college} />)}
      </section>
    </main>
  );
}

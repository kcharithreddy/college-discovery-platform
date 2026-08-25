'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CollegeCard } from '@/components/CollegeCard';
import { College, api } from '@/lib/api';

export default function SavedPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [saved, setSaved] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadSaved() {
    setLoading(true);
    try {
      const data = await api<College[]>('/saved');
      setSaved(data);
      setLoggedIn(true);
    } catch {
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadSaved(); }, []);

  if (loading) {
    return <main className="mx-auto max-w-5xl px-4 py-8"><p className="rounded-xl bg-white p-6 text-center shadow-sm dark:bg-slate-900">Loading saved colleges...</p></main>;
  }

  if (!loggedIn) {
    return (
      <main className="mx-auto max-w-md px-4 py-10">
        <section className="rounded-3xl bg-white p-6 text-center shadow-sm dark:bg-slate-900">
          <h1 className="text-2xl font-extrabold">Login required</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Sign in to save and view your shortlisted colleges.</p>
          <Link href="/auth" className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Go to login</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-extrabold">Saved Colleges</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Your personal shortlist from the database.</p>
      {saved.length === 0 && <p className="mt-6 rounded-xl bg-white p-6 text-center shadow-sm dark:bg-slate-900">No saved colleges yet. Go to listing and click Save.</p>}
      <section className="mt-8 grid gap-5 md:grid-cols-2">
        {saved.map(college => (
          <CollegeCard key={college.id} college={college} savedView onRemoved={id => setSaved(current => current.filter(item => item.id !== id))} />
        ))}
      </section>
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { CollegeCard } from '@/components/CollegeCard';
import { College, api } from '@/lib/api';

type Response = { items: College[]; meta: { page: number; totalPages: number; total: number } };

export default function HomePage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');
  const [course, setCourse] = useState('');
  const [maxFees, setMaxFees] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api<{ locations: string[]; courses: string[] }>('/colleges/filters')
      .then(data => { setLocations(data.locations); setCourses(data.courses); })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');
    const params = new URLSearchParams({ page: String(page), limit: '6' });
    if (q) params.set('q', q);
    if (location) params.set('location', location);
    if (course) params.set('course', course);
    if (maxFees) params.set('maxFees', maxFees);

    api<Response>(`/colleges?${params}`)
      .then(data => { setColleges(data.items); setTotalPages(data.meta.totalPages || 1); })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [q, location, course, maxFees, page]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-slate-900 p-8 text-white shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-100">College Discovery MVP</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold">Find, compare and shortlist colleges with real database-backed search.</h1>
        <p className="mt-4 max-w-2xl text-blue-100">Search colleges, filter by fees/course/location, open detail pages, compare colleges and predict options by exam rank.</p>
      </section>

      <section className="mt-8 rounded-2xl border bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-5">
          <input value={q} onChange={e => { setQ(e.target.value); setPage(1); }} placeholder="Search college name" className="rounded-xl border px-4 py-3 md:col-span-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500" />
          <select value={location} onChange={e => { setLocation(e.target.value); setPage(1); }} className="rounded-xl border px-4 py-3 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
            <option value="">All locations</option>
            {locations.map(item => <option key={item}>{item}</option>)}
          </select>
          <select value={course} onChange={e => { setCourse(e.target.value); setPage(1); }} className="rounded-xl border px-4 py-3 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100">
            <option value="">All courses</option>
            {courses.map(item => <option key={item}>{item}</option>)}
          </select>
          <input value={maxFees} onChange={e => { setMaxFees(e.target.value); setPage(1); }} type="number" placeholder="Max fees" className="rounded-xl border px-4 py-3 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:placeholder-slate-500" />
        </div>
      </section>

      {loading && <p className="mt-8 rounded-xl bg-white p-6 text-center shadow-sm dark:bg-slate-900">Loading colleges...</p>}
      {error && <p className="mt-8 rounded-xl bg-red-50 p-6 text-center text-red-700 dark:bg-red-950/30 dark:text-red-400">{error}</p>}
      {!loading && !error && colleges.length === 0 && <p className="mt-8 rounded-xl bg-white p-6 text-center shadow-sm dark:bg-slate-900">No colleges found.</p>}

      <section className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {colleges.map(college => <CollegeCard key={college.id} college={college} />)}
      </section>

      <div className="mt-8 flex items-center justify-center gap-3">
        <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">Previous</button>
        <span className="font-semibold">Page {page} of {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">Next</button>
      </div>
    </main>
  );
}

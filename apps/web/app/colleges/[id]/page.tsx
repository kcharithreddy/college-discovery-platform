import Link from 'next/link';
import { notFound } from 'next/navigation';
import { API_URL, College, formatFees } from '@/lib/api';

async function getCollege(id: string): Promise<College | null> {
  const res = await fetch(`${API_URL}/colleges/${encodeURIComponent(id)}`, { cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load college');
  return res.json();
}

export default async function CollegeDetail({ params }: { params: { id: string } }) {
  const college = await getCollege(params.id);
  if (!college) notFound();

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/" className="text-sm font-semibold text-blue-700 dark:text-blue-400">← Back to colleges</Link>
      <section className="mt-4 rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-950 dark:text-slate-100">{college.name}</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{college.location} • {college.course}</p>
          </div>
          <div className="rounded-2xl bg-green-50 p-4 text-green-800 dark:bg-green-950 dark:text-green-300"><p className="text-sm">Rating</p><p className="text-2xl font-bold">⭐ {college.rating}</p></div>
        </div>
        <p className="mt-6 leading-7 text-slate-700 dark:text-slate-300">{college.overview}</p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900"><p className="text-slate-500 dark:text-slate-400">Fees</p><p className="text-xl font-bold">{formatFees(college.fees)}</p></div>
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900"><p className="text-slate-500 dark:text-slate-400">Placement</p><p className="text-xl font-bold">{college.placementRate}%</p></div>
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900"><p className="text-slate-500 dark:text-slate-400">Avg Package</p><p className="text-xl font-bold">₹{college.averagePackage} LPA</p></div>
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-slate-900"><p className="text-slate-500 dark:text-slate-400">Accepted Exam</p><p className="text-xl font-bold">{college.exam}</p></div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <h2 className="text-2xl font-bold">Courses</h2>
        <div className="mt-4 overflow-hidden rounded-xl border dark:border-slate-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800"><tr><th className="p-3">Course</th><th>Duration</th><th>Fees</th></tr></thead>
            <tbody>{college.courses?.map(c => <tr key={c.id} className="border-t dark:border-slate-800"><td className="p-3 font-semibold">{c.name}</td><td>{c.duration}</td><td>{formatFees(c.fees)}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {college.reviews?.map(r => <div key={r.id} className="rounded-2xl border p-4 dark:border-slate-800"><p className="font-bold">{r.student} • ⭐ {r.rating}</p><p className="mt-2 text-slate-600 dark:text-slate-400">{r.comment}</p></div>)}
        </div>
      </section>
    </main>
  );
}

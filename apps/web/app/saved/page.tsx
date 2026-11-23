'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Heart, LogIn } from 'lucide-react';
import { CollegeCard, CollegeCardSkeleton } from '@/components/CollegeCard';
import { ApiError, College, api } from '@/lib/api';

export default function SavedPage() {
  const [state, setState] = useState<'loading' | 'ready' | 'logged-out' | 'error'>('loading');
  const [saved, setSaved] = useState<College[]>([]);

  useEffect(() => {
    api<College[]>('/saved')
      .then(data => { setSaved(data); setState('ready'); })
      .catch(err => setState(err instanceof ApiError && err.status === 401 ? 'logged-out' : 'error'));
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="eyebrow">Your shortlist</p>
      <h1 className="mt-2 text-4xl font-extrabold">Saved colleges</h1>

      {state === 'loading' && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 3 }, (_, i) => <CollegeCardSkeleton key={i} />)}</div>
      )}

      {state === 'logged-out' && (
        <EmptyState icon={LogIn} title="Log in to see your shortlist" text="Save colleges as you browse and come back to them any time.">
          <Link href="/auth" className="btn-primary">Log in</Link>
        </EmptyState>
      )}

      {state === 'error' && (
        <EmptyState icon={Heart} title="Couldn't load your shortlist" text="Please check your connection and try again.">
          <button onClick={() => window.location.reload()} className="btn-secondary">Try again</button>
        </EmptyState>
      )}

      {state === 'ready' && saved.length === 0 && (
        <EmptyState icon={Heart} title="No saved colleges yet" text="Tap “Save” on any college to add it to your shortlist.">
          <Link href="/" className="btn-primary">Explore colleges</Link>
        </EmptyState>
      )}

      {state === 'ready' && saved.length > 0 && (
        <>
          <p className="mt-2 text-sub">{saved.length} college{saved.length === 1 ? '' : 's'} on your list</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map(college => (
              <CollegeCard key={college.id} college={college} savedView onRemoved={id => setSaved(current => current.filter(item => item.id !== id))} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}

function EmptyState({ icon: Icon, title, text, children }: { icon: typeof Heart; title: string; text: string; children: React.ReactNode }) {
  return (
    <div className="card mt-8 flex flex-col items-center px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300"><Icon className="h-6 w-6" /></span>
      <h2 className="mt-4 text-xl font-bold">{title}</h2>
      <p className="mt-1 max-w-sm text-sub">{text}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

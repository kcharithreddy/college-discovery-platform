'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';

// Shown when a page fails to load, most often because the API is still waking up on free hosting.
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const [retrying, startRetry] = useTransition();
  // Refetch the server data, then re-render the page that failed.
  const retry = () => startRetry(() => { router.refresh(); reset(); });

  return (
    <main className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
        <RefreshCw className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-4xl font-extrabold">Just a moment</h1>
      <p className="mt-2 text-sub">We couldn&apos;t load this page. The server may be starting up, which can take up to a minute. Please try again.</p>
      <div className="mt-8 flex gap-3">
        <button type="button" onClick={retry} disabled={retrying} className="btn-primary">{retrying ? 'Retrying…' : 'Try again'}</button>
        <Link href="/" className="btn-secondary">Back to colleges</Link>
      </div>
    </main>
  );
}

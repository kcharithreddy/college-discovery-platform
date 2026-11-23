import Link from 'next/link';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
        <Compass className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-4xl font-extrabold">Page not found</h1>
      <p className="mt-2 text-sub">The page or college you&apos;re looking for doesn&apos;t exist, or may have moved.</p>
      <Link href="/" className="btn-primary mt-8">Back to colleges</Link>
    </main>
  );
}

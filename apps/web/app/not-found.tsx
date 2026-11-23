import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-3xl font-extrabold">Page not found</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">The page or college you are looking for does not exist.</p>
      <Link href="/" className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
        Back to colleges
      </Link>
    </main>
  );
}

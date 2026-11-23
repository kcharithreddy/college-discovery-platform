import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-800 text-white">
              <GraduationCap className="h-4 w-4" />
            </span>
            <span className="font-display font-bold">CollegeFinder</span>
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-sub">
            Honest information for students choosing an engineering college: official data where we have it, and &ldquo;Not available&rdquo; where we don&apos;t.
          </p>
        </div>
        <div>
          <h2 className="font-sans text-sm font-bold">Explore</h2>
          <ul className="mt-3 space-y-2 text-sm text-sub">
            <li><Link href="/" className="hover:text-ink">All colleges</Link></li>
            <li><Link href="/compare" className="hover:text-ink">Compare colleges</Link></li>
            <li><Link href="/predictor" className="hover:text-ink">Rank predictor</Link></li>
            <li><Link href="/saved" className="hover:text-ink">Your shortlist</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-sans text-sm font-bold">Need help?</h2>
          <ul className="mt-3 space-y-2 text-sm text-sub">
            <li>Anti-ragging helpline: <a href="tel:18001805522" className="font-semibold text-ink hover:underline">1800-180-5522</a></li>
            <li>Always confirm fees and cutoffs on the college&apos;s official website.</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-faint">© {new Date().getFullYear()} CollegeFinder · Data is for guidance only.</p>
    </footer>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GraduationCap, LogOut } from 'lucide-react';
import { clearToken, getToken } from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useCompare } from '@/components/CompareProvider';

const LINKS = [
  { href: '/', label: 'Explore' },
  { href: '/compare', label: 'Compare' },
  { href: '/predictor', label: 'Predictor' },
  { href: '/saved', label: 'Saved' }
];

export function Nav() {
  const pathname = usePathname();
  const { items } = useCompare();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const sync = () => setLoggedIn(Boolean(getToken()));
    sync();
    window.addEventListener('auth-changed', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('auth-changed', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  function logout() {
    clearToken();
    window.location.href = '/';
  }

  const isActive = (href: string) => (href === '/' ? pathname === '/' || pathname.startsWith('/colleges') : pathname.startsWith(href));

  const links = LINKS.map(link => (
    <Link
      key={link.href}
      href={link.href}
      aria-current={isActive(link.href) ? 'page' : undefined}
      className={`relative rounded-lg px-3 py-2 text-sm font-semibold transition ${
        isActive(link.href) ? 'bg-muted text-ink' : 'text-sub hover:bg-muted hover:text-ink'
      }`}
    >
      {link.label}
      {link.href === '/compare' && items.length > 0 && (
        <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[11px] text-white">{items.length}</span>
      )}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-page/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-800 text-white shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">CollegeFinder</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">{links}</nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loggedIn ? (
            <button onClick={logout} className="btn-secondary h-9 px-3"><LogOut className="h-4 w-4" /><span className="hidden sm:inline">Log out</span></button>
          ) : (
            <Link href="/auth" className="btn-primary h-9 px-4">Log in</Link>
          )}
        </div>
      </div>
      <nav aria-label="Main" className="flex gap-1 overflow-x-auto border-t border-line/80 px-3 py-1.5 md:hidden">{links}</nav>
    </header>
  );
}

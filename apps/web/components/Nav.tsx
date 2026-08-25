'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { clearToken, getToken } from '@/lib/api';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Nav() {
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

  return (
    <nav className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-slate-900 dark:text-white">CollegeFinder</Link>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/" className="dark:text-slate-200">Colleges</Link>
          <Link href="/compare" className="dark:text-slate-200">Compare</Link>
          <Link href="/predictor" className="dark:text-slate-200">Predictor</Link>
          <Link href="/saved" className="dark:text-slate-200">Saved</Link>
          <ThemeToggle />
          {loggedIn ? (
            <button onClick={logout} className="rounded-lg bg-slate-900 px-3 py-2 text-white dark:bg-slate-800">Logout</button>
          ) : (
            <Link href="/auth" className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

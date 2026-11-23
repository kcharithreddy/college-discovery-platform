'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';

const ORDER = ['light', 'dark', 'system'] as const;
const LABELS = { light: 'Light theme', dark: 'Dark theme', system: 'System theme' };

/** One button that cycles light → dark → system. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <span className="h-9 w-9" />;

  const current = (ORDER as readonly string[]).includes(theme ?? '') ? (theme as (typeof ORDER)[number]) : 'system';
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const Icon = current === 'light' ? Sun : current === 'dark' ? Moon : Monitor;

  return (
    <button
      onClick={() => setTheme(next)}
      title={`${LABELS[current]}: switch to ${LABELS[next].toLowerCase()}`}
      aria-label={`${LABELS[current]}. Switch to ${LABELS[next].toLowerCase()}`}
      className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-surface text-sub transition hover:text-ink"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

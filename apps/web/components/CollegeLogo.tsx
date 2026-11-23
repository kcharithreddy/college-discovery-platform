/* eslint-disable @next/next/no-img-element -- logos are small static files of varying shapes */
import type { College } from '@/lib/api';

type Props = { college: Pick<College, 'name' | 'logo'>; size?: 'sm' | 'lg' };

/**
 * Shows the college's official logo on a white tile (logos are usually designed
 * for light backgrounds). Falls back to the college's initials.
 */
export function CollegeLogo({ college, size = 'sm' }: Props) {
  const box = size === 'lg' ? 'h-16 max-w-[280px] px-3' : 'h-10 max-w-[150px] px-2';

  if (college.logo) {
    return (
      <div className={`flex shrink-0 items-center rounded-xl border bg-white py-1.5 dark:border-slate-700 ${box}`}>
        <img src={college.logo} alt={`${college.name} logo`} className="h-full w-auto object-contain" />
      </div>
    );
  }

  const initials = college.name
    .replace(/[()]/g, '')
    .split(/\s+/)
    .filter(word => /^[A-Z]/.test(word))
    .slice(0, 3)
    .map(word => (word.length <= 4 && word === word.toUpperCase() ? word : word[0]))
    .join('')
    .slice(0, 4);

  const square = size === 'lg' ? 'h-16 w-16 text-lg' : 'h-10 w-10 text-xs';
  return (
    <div aria-hidden className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-slate-800 font-extrabold text-white ${square}`}>
      {initials}
    </div>
  );
}

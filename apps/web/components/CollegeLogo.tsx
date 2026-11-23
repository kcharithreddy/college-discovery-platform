/* eslint-disable @next/next/no-img-element -- logos are small static files of varying shapes */
import type { College } from '@/lib/api';

type Size = 'xs' | 'sm' | 'md' | 'lg';
type Props = { college: Pick<College, 'name' | 'logo'>; size?: Size };

const LOGO_BOX: Record<Size, string> = {
  xs: 'h-7 max-w-[64px] px-1',
  sm: 'h-11 max-w-[150px] px-2',
  md: 'h-14 max-w-[220px] px-2.5',
  lg: 'h-20 max-w-[300px] px-3'
};

const INITIALS_BOX: Record<Size, string> = {
  xs: 'h-7 w-7 text-[10px] rounded-lg',
  sm: 'h-11 w-11 text-xs rounded-xl',
  md: 'h-14 w-14 text-sm rounded-2xl',
  lg: 'h-20 w-20 text-xl rounded-2xl'
};

// A few calm gradients, picked per college so the initials tiles don't all look the same.
const GRADIENTS = [
  'from-brand-500 to-brand-800',
  'from-indigo-500 to-violet-700',
  'from-sky-500 to-blue-700',
  'from-teal-500 to-emerald-700',
  'from-amber-500 to-orange-700',
  'from-rose-500 to-pink-700'
];

export function initialsFor(name: string) {
  // A bracketed short form is the most recognisable: "IIT (BHU) Varanasi" → "BHU".
  const bracketed = name.match(/\(([A-Z]{2,5})\)/);
  if (bracketed) return bracketed[1];
  const words = name.split(/\s+/).filter(word => /^[A-Z]/.test(word));
  const isAcronym = (word: string) => word.length <= 5 && word === word.toUpperCase();
  // IIT/NIT/IIIT need the campus letter ("IIT Madras" → "IITM"); other acronyms stand alone ("BITS Pilani" → "BITS").
  if (words[0] && isAcronym(words[0])) {
    const needsCampus = ['IIT', 'NIT', 'IIIT'].includes(words[0]) && words[1] && !isAcronym(words[1]);
    return needsCampus ? words[0] + words[1][0] : words[0];
  }
  // Otherwise use first letters: "Anna University" → "AU", "Delhi Technological University" → "DTU"
  return words.slice(0, 3).map(word => (isAcronym(word) ? word : word[0])).join('').slice(0, 4);
}

/**
 * Official logo on a white tile (logos are designed for light backgrounds),
 * or the college's initials when no logo has been added yet.
 */
export function CollegeLogo({ college, size = 'sm' }: Props) {
  if (college.logo) {
    return (
      <div className={`flex shrink-0 items-center rounded-xl border border-line bg-white py-1 ${LOGO_BOX[size]}`}>
        <img src={college.logo} alt={`${college.name} logo`} className="h-full w-auto object-contain" />
      </div>
    );
  }

  const gradient = GRADIENTS[[...college.name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % GRADIENTS.length];
  return (
    <div aria-hidden className={`flex shrink-0 items-center justify-center bg-gradient-to-br font-display font-extrabold text-white ${gradient} ${INITIALS_BOX[size]}`}>
      {initialsFor(college.name)}
    </div>
  );
}

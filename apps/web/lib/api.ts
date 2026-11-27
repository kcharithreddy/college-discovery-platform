export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export type Course = { id: string; name: string; duration: string; fees: number };

export type Review = {
  id: string;
  rating: number;
  academics: number | null;
  infrastructure: number | null;
  campusLife: number | null;
  placements: number | null;
  title: string;
  comment: string;
  pros: string | null;
  cons: string | null;
  graduationYear: number | null;
  createdAt: string;
  user?: { name: string };
};

export type College = {
  id: string;
  name: string;
  slug: string;
  city: string;
  state: string;
  type: string;
  ownership: string;
  established: number | null;
  campusAcres: number | null;
  website: string | null;
  logo: string | null;
  overview: string;
  nirfRank: number | null;
  nirfScore: number | null;
  nirfYear: number | null;
  course: string;
  exam: string;
  minRank: number | null;
  maxRank: number | null;
  fees: number | null;
  hostelFees: number | null;
  placementRate: number | null;
  averagePackage: number | null;
  medianPackage: number | null;
  hostelAvailable: boolean;
  facilities: string[];
  campusLife: string[];
  sports: string[];
  fests: string[];
  pros: string[];
  cons: string[];
  rating: number | null;
  reviewCount: number;
  sourceNote: string | null;
  updatedAt: string;
  courses?: Course[];
  reviews?: Review[];
};

export type FiltersResponse = { states: string[]; types: string[]; exams: string[]; courses: string[] };
export type AuthResponse = { token: string; user: { id: string; name: string; email?: string | null; phone?: string | null; provider?: string } };

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function setToken(token: string) {
  localStorage.setItem('token', token);
  window.dispatchEvent(new Event('auth-changed'));
}

export function clearToken() {
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('auth-changed'));
}

/** Free hosting puts the API to sleep when idle; waking it can take up to about a minute. */
const WAKE_UP_RETRY_DELAYS_MS = [2000, 4000, 8000, 15000, 30000];
const OFFLINE_MESSAGE = 'Could not reach the server. It may be starting up, so please try again in a minute.';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const request = () => fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    cache: 'no-store'
  });

  // Only reads are retried: repeating a POST or DELETE could submit it twice.
  const canRetry = !options.method || options.method.toUpperCase() === 'GET';
  let res: Response | undefined;
  for (let attempt = 0; !res; attempt++) {
    try {
      res = await request();
      // 502/503/504 come from the host while the API is still booting.
      if (canRetry && [502, 503, 504].includes(res.status) && attempt < WAKE_UP_RETRY_DELAYS_MS.length) {
        res = undefined;
        await wait(WAKE_UP_RETRY_DELAYS_MS[attempt]);
      }
    } catch {
      // fetch only throws on network failure (server unreachable or asleep).
      if (!canRetry || attempt >= WAKE_UP_RETRY_DELAYS_MS.length) throw new ApiError(OFFLINE_MESSAGE, 0);
      await wait(WAKE_UP_RETRY_DELAYS_MS[attempt]);
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new ApiError(error.message || 'Request failed', res.status);
  }
  return res.json();
}

export const NOT_AVAILABLE = 'Not available';

/** Colleges whose numbers are still the old sample values (see apps/api/prisma/data/colleges.ts). */
export function isUnverified(college: Pick<College, 'sourceNote'>) {
  return college.sourceNote?.startsWith('Fees, placement and cutoff figures are sample values') ?? false;
}

export function formatFees(value: number | null | undefined) {
  if (value == null) return NOT_AVAILABLE;
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

/** Compact rupees for tight spaces: 225000 → "₹2.25L", 55000 → "₹55K". */
export function formatLakh(value: number | null | undefined) {
  if (value == null) return NOT_AVAILABLE;
  if (value >= 100000) return `₹${Number((value / 100000).toFixed(2))}L`;
  return `₹${Math.round(value / 1000)}K`;
}

export function formatLpa(value: number | null | undefined) {
  return value == null ? NOT_AVAILABLE : `₹${value} LPA`;
}

export function formatPercent(value: number | null | undefined) {
  return value == null ? NOT_AVAILABLE : `${value}%`;
}

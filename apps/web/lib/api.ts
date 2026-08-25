export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export type College = {
  id: string;
  name: string;
  slug: string;
  location: string;
  fees: number;
  rating: number;
  course: string;
  placementRate: number;
  averagePackage: number;
  exam: string;
  minRank: number;
  maxRank: number;
  overview: string;
  courses?: { id: string; name: string; duration: string; fees: number }[];
  reviews?: { id: string; student: string; rating: number; comment: string }[];
};

export type FiltersResponse = { locations: string[]; courses: string[]; exams: string[] };
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

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    cache: 'no-store'
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new ApiError(error.message || 'Request failed', res.status);
  }
  return res.json();
}

export function formatFees(value: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

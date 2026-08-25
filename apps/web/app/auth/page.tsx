'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthResponse, api, setToken } from '@/lib/api';

type AuthMethod = 'google' | 'mobile' | 'email';

export default function AuthPage() {
  const router = useRouter();
  const [method, setMethod] = useState<AuthMethod>('google');
  
  // Google Sign-In state
  const [googleEmail, setGoogleEmail] = useState('student.demo@gmail.com');
  const [googleName, setGoogleName] = useState('Google Student');

  // Mobile OTP state
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [demoOtpInfo, setDemoOtpInfo] = useState('');

  // Email / Password state
  const [emailMode, setEmailMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('Student');
  const [email, setEmail] = useState('demo@student.com');
  const [password, setPassword] = useState('password123');

  // General UI state
  const [message, setMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [busy, setBusy] = useState(false);

  // 1. Google Sign-In Handler
  async function handleGoogleLogin(e?: React.FormEvent, customEmail?: string) {
    if (e) e.preventDefault();
    setBusy(true);
    setMessage('');
    setSuccessMsg('');
    const targetEmail = customEmail || googleEmail;
    try {
      const data = await api<AuthResponse>('/auth/google', {
        method: 'POST',
        body: JSON.stringify({ email: targetEmail, name: googleName })
      });
      setToken(data.token);
      setSuccessMsg('Signed in with Google successfully! Redirecting...');
      setTimeout(() => router.push('/saved'), 800);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Google authentication failed');
    } finally {
      setBusy(false);
    }
  }

  // 2. Mobile OTP - Send OTP Handler
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    setSuccessMsg('');
    try {
      const res = await api<{ message: string; demoOtp: string }>('/auth/mobile/send-otp', {
        method: 'POST',
        body: JSON.stringify({ phone })
      });
      setOtpSent(true);
      setOtp(res.demoOtp || '123456');
      setDemoOtpInfo(`OTP sent to +91 ${phone}. (Demo OTP: ${res.demoOtp || '123456'})`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setBusy(false);
    }
  }

  // 3. Mobile OTP - Verify OTP Handler
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    setSuccessMsg('');
    try {
      const data = await api<AuthResponse>('/auth/mobile/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phone, otp })
      });
      setToken(data.token);
      setSuccessMsg('Mobile authentication successful! Redirecting...');
      setTimeout(() => router.push('/saved'), 800);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'OTP verification failed');
    } finally {
      setBusy(false);
    }
  }

  // 4. Standard Email/Password Handler
  async function handleEmailAuth(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    setSuccessMsg('');
    try {
      const body = emailMode === 'register' ? { name, email, password } : { email, password };
      const data = await api<AuthResponse>(`/auth/${emailMode}`, {
        method: 'POST',
        body: JSON.stringify(body)
      });
      setToken(data.token);
      setSuccessMsg('Authentication successful! Redirecting...');
      setTimeout(() => router.push('/saved'), 800);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-12">
      <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Sign in or create your CollegeFinder account
          </p>
        </div>

        {/* Method Switcher Tabs */}
        <div className="mt-6 flex rounded-2xl bg-slate-100 p-1.5 dark:bg-slate-800/80">
          <button
            type="button"
            onClick={() => { setMethod('google'); setMessage(''); setSuccessMsg(''); }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all ${
              method === 'google'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Google
          </button>

          <button
            type="button"
            onClick={() => { setMethod('mobile'); setMessage(''); setSuccessMsg(''); }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all ${
              method === 'mobile'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Mobile OTP
          </button>

          <button
            type="button"
            onClick={() => { setMethod('email'); setMessage(''); setSuccessMsg(''); }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all ${
              method === 'email'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            <svg className="h-4 w-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email & Pass
          </button>
        </div>

        {/* Tab 1: Google Login */}
        {method === 'google' && (
          <div className="mt-6 space-y-4">
            <button
              disabled={busy}
              onClick={e => handleGoogleLogin(e)}
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700/80"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Continue with Google
            </button>

            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              <span className="absolute bg-white px-3 text-xs uppercase tracking-wider text-slate-400 dark:bg-slate-900 dark:text-slate-500">
                or sign in with Google email
              </span>
            </div>

            <form onSubmit={handleGoogleLogin} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Google Email</label>
                <input
                  value={googleEmail}
                  onChange={e => setGoogleEmail(e.target.value)}
                  type="email"
                  placeholder="name@gmail.com"
                  className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Name (Optional)</label>
                <input
                  value={googleName}
                  onChange={e => setGoogleName(e.target.value)}
                  type="text"
                  placeholder="Your Name"
                  className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              <button
                disabled={busy}
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 font-semibold text-white shadow-md hover:from-blue-700 hover:to-indigo-700 disabled:opacity-60"
              >
                {busy ? 'Connecting...' : 'Sign in with Google Email'}
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Mobile OTP Login */}
        {method === 'mobile' && (
          <div className="mt-6">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Mobile Phone Number</label>
                  <div className="mt-1 flex items-center rounded-xl border dark:border-slate-800 dark:bg-slate-950">
                    <span className="px-3 text-sm font-bold text-slate-500 border-r dark:border-slate-800 dark:text-slate-400">+91</span>
                    <input
                      value={phone}
                      onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      className="w-full bg-transparent px-4 py-3 text-sm font-medium focus:outline-none dark:text-slate-100"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">We will send a 6-digit OTP to verify your phone number.</p>
                </div>

                <button
                  disabled={busy || phone.length !== 10}
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white shadow-md hover:bg-blue-700 disabled:opacity-60"
                >
                  {busy ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                {demoOtpInfo && (
                  <div className="rounded-xl bg-blue-50 p-3 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
                    {demoOtpInfo}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Enter 6-Digit OTP</label>
                  <input
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    className="mt-1 w-full rounded-xl border px-4 py-3 text-center text-lg font-bold tracking-widest focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>

                <button
                  disabled={busy || otp.length !== 6}
                  type="submit"
                  className="w-full rounded-xl bg-green-600 px-4 py-3.5 font-semibold text-white shadow-md hover:bg-green-700 disabled:opacity-60"
                >
                  {busy ? 'Verifying...' : 'Verify OTP & Login'}
                </button>

                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="w-full text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  ← Change Mobile Number
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 3: Standard Email & Password */}
        {method === 'email' && (
          <form onSubmit={handleEmailAuth} className="mt-6 space-y-4">
            <div className="flex rounded-xl bg-slate-100 p-1 text-xs font-semibold dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setEmailMode('login')}
                className={`flex-1 rounded-lg py-2 ${emailMode === 'login' ? 'bg-white shadow-sm dark:bg-slate-950 dark:text-white' : 'dark:text-slate-400'}`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setEmailMode('register')}
                className={`flex-1 rounded-lg py-2 ${emailMode === 'register' ? 'bg-white shadow-sm dark:bg-slate-950 dark:text-white' : 'dark:text-slate-400'}`}
              >
                Register
              </button>
            </div>

            {emailMode === 'register' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Student Name"
                  className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="demo@student.com"
                className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Password</label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              />
            </div>

            <button
              disabled={busy}
              type="submit"
              className="w-full rounded-xl bg-blue-600 px-4 py-3.5 font-semibold text-white shadow-md hover:bg-blue-700 disabled:opacity-60"
            >
              {busy ? 'Please wait...' : emailMode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>
        )}

        {/* Feedback Messages */}
        {message && (
          <div className="mt-4 rounded-xl bg-red-50 p-3.5 text-center text-xs font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-400">
            {message}
          </div>
        )}

        {successMsg && (
          <div className="mt-4 rounded-xl bg-green-50 p-3.5 text-center text-xs font-semibold text-green-700 dark:bg-green-950/40 dark:text-green-300">
            {successMsg}
          </div>
        )}

      </div>
    </main>
  );
}

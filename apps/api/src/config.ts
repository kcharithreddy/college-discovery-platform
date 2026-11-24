import 'dotenv/config';

const isProduction = process.env.NODE_ENV === 'production';

function required(name: string, devFallback: string) {
  const value = process.env[name];
  if (value) return value;
  if (isProduction) throw new Error(`Missing required environment variable: ${name}`);
  return devFallback;
}

const jwtSecret = required('JWT_SECRET', 'dev-only-secret-not-for-production-use-0000');

// A short or example secret would let anyone forge login tokens, so refuse to start with one.
if (isProduction && (jwtSecret.length < 32 || /change-this|dev-only|secret$/i.test(jwtSecret))) {
  throw new Error('JWT_SECRET must be a random string of at least 32 characters in production (try: openssl rand -hex 32)');
}

export const config = {
  isProduction,
  port: Number(process.env.PORT || 4000),
  jwtSecret,
  /** Comma-separated list of allowed frontend origins. */
  clientUrls: (process.env.CLIENT_URL || 'http://localhost:3000')
    .split(',')
    .map(url => url.trim())
    .filter(Boolean),
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  /** Demo OTP mode returns a fixed code instead of sending an SMS. Off in production unless explicitly enabled. */
  demoOtp: process.env.DEMO_OTP ? process.env.DEMO_OTP === 'true' : !isProduction,
  /** Number of reverse proxies in front of the API (Render/Railway: 1). 0 when running directly. */
  trustProxy: Number(process.env.TRUST_PROXY ?? (isProduction ? 1 : 0))
};

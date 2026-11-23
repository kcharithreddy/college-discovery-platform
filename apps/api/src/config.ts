import 'dotenv/config';

const isProduction = process.env.NODE_ENV === 'production';

function required(name: string, devFallback: string) {
  const value = process.env[name];
  if (value) return value;
  if (isProduction) throw new Error(`Missing required environment variable: ${name}`);
  return devFallback;
}

export const config = {
  isProduction,
  port: Number(process.env.PORT || 4000),
  jwtSecret: required('JWT_SECRET', 'dev-only-secret'),
  /** Comma-separated list of allowed frontend origins. */
  clientUrls: (process.env.CLIENT_URL || 'http://localhost:3000')
    .split(',')
    .map(url => url.trim())
    .filter(Boolean),
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  /** Demo OTP mode returns a fixed code instead of sending an SMS. Off in production unless explicitly enabled. */
  demoOtp: process.env.DEMO_OTP ? process.env.DEMO_OTP === 'true' : !isProduction
};

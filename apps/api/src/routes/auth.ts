import { randomInt, timingSafeEqual } from 'crypto';
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { OAuth2Client } from 'google-auth-library';
import { config } from '../config';
import { prisma } from '../prisma';
import { asyncHandler, toPublicUser } from '../utils';
import { JWT_ALGORITHM, JWT_ISSUER } from '../middleware/auth';
import { authLimiter, otpSendLimiter, otpVerifyLimiter } from '../security';

const router = Router();
const googleClient = new OAuth2Client(config.googleClientId);

const DEMO_OTP = '123456';
const OTP_TTL_MS = 5 * 60 * 1000;
/** Wrong guesses allowed per OTP before it is thrown away (stops brute-forcing the 6 digits). */
const OTP_MAX_ATTEMPTS = 5;
const BCRYPT_ROUNDS = 12;
// Compared against when the email doesn't exist, so login takes the same time either way
// and attackers can't discover which emails are registered.
const DUMMY_HASH = bcrypt.hashSync('timing-equaliser-not-a-real-password', BCRYPT_ROUNDS);

// In-memory OTP store. Fine for a single instance; use Redis or a DB table when scaling out.
const otpStore = new Map<string, { code: string; expiresAt: number; attempts: number }>();

// Drop expired OTPs every minute so the store can't grow without bound.
setInterval(() => {
  const now = Date.now();
  for (const [phone, entry] of otpStore) if (entry.expiresAt < now) otpStore.delete(phone);
}, 60 * 1000).unref();

function sameCode(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

const phoneSchema = z.string().trim().regex(/^\d{10}$/, 'Phone number must be a 10-digit number');

const emailSchema = z.string().trim().max(254).email().transform(email => email.toLowerCase());

const registerSchema = z.object({
  name: z.string().trim().min(2).max(60).optional(),
  email: emailSchema,
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be at most 72 characters')
    .regex(/[A-Za-z]/, 'Password must contain a letter')
    .regex(/[0-9]/, 'Password must contain a number')
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1).max(72)
});

const googleAuthSchema = z.object({
  credential: z.string().min(1, 'Google credential token is required').max(4096)
});

const sendOtpSchema = z.object({ phone: phoneSchema });

const verifyOtpSchema = z.object({
  phone: phoneSchema,
  otp: z.string().trim().length(6, 'OTP must be 6 digits'),
  name: z.string().trim().min(2).max(60).optional()
});

function createToken(userId: string) {
  return jwt.sign({ userId }, config.jwtSecret, { algorithm: JWT_ALGORITHM, issuer: JWT_ISSUER, expiresIn: '7d' });
}

router.post('/register', authLimiter, asyncHandler(async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
    return;
  }

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    res.status(409).json({ message: 'Email already registered' });
    return;
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name || 'Student',
      email: parsed.data.email,
      password: await bcrypt.hash(parsed.data.password, BCRYPT_ROUNDS),
      provider: 'credentials'
    }
  });

  res.status(201).json({ user: toPublicUser(user), token: createToken(user.id) });
}));

router.post('/login', authLimiter, asyncHandler(async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  // Always run one bcrypt comparison so response time doesn't reveal whether the email exists.
  const ok = await bcrypt.compare(parsed.data.password, user?.password ?? DUMMY_HASH) && Boolean(user?.password);
  if (!user || !ok) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  // Upgrade passwords stored with an older, cheaper bcrypt cost the next time the user logs in.
  if (bcrypt.getRounds(user.password!) < BCRYPT_ROUNDS) {
    await prisma.user.update({ where: { id: user.id }, data: { password: await bcrypt.hash(parsed.data.password, BCRYPT_ROUNDS) } });
  }

  res.json({ user: toPublicUser(user), token: createToken(user.id) });
}));

// Verifies a Google Identity Services ID token sent by the frontend.
router.post('/google', authLimiter, asyncHandler(async (req, res) => {
  if (!config.googleClientId) {
    res.status(503).json({ message: 'Google sign-in is not configured on the server' });
    return;
  }

  const parsed = googleAuthSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Google credential token is missing or invalid', errors: parsed.error.flatten() });
    return;
  }

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({ idToken: parsed.data.credential, audience: config.googleClientId });
    payload = ticket.getPayload();
  } catch (error) {
    console.error('Google token verification error:', error);
  }

  if (!payload?.email) {
    res.status(401).json({ message: 'Google authentication failed: invalid or expired token' });
    return;
  }

  const email = payload.email.toLowerCase();
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: payload.name || payload.given_name || email.split('@')[0], provider: 'google' }
  });

  res.json({ user: toPublicUser(user), token: createToken(user.id) });
}));

router.post('/mobile/send-otp', otpSendLimiter, asyncHandler(async (req, res) => {
  const parsed = sendOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid phone number format', errors: parsed.error.flatten() });
    return;
  }

  const { phone } = parsed.data;
  const code = config.demoOtp ? DEMO_OTP : String(randomInt(0, 1_000_000)).padStart(6, '0');
  otpStore.set(phone, { code, expiresAt: Date.now() + OTP_TTL_MS, attempts: 0 });

  // TODO: deliver `code` via an SMS provider when demo mode is off.
  res.json({
    message: `OTP sent successfully to +91 ${phone}`,
    ...(config.demoOtp ? { demoOtp: code } : {})
  });
}));

router.post('/mobile/verify-otp', otpVerifyLimiter, asyncHandler(async (req, res) => {
  const parsed = verifyOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
    return;
  }

  const { phone, otp, name } = parsed.data;
  const stored = otpStore.get(phone);
  if (!stored || stored.expiresAt < Date.now()) {
    otpStore.delete(phone);
    res.status(400).json({ message: 'Invalid or expired OTP' });
    return;
  }
  if (!sameCode(stored.code, otp)) {
    stored.attempts += 1;
    if (stored.attempts >= OTP_MAX_ATTEMPTS) {
      otpStore.delete(phone);
      res.status(429).json({ message: 'Too many wrong attempts. Please request a new OTP.' });
      return;
    }
    res.status(400).json({ message: 'Invalid or expired OTP' });
    return;
  }
  otpStore.delete(phone);

  const user = await prisma.user.upsert({
    where: { phone },
    update: {},
    create: { phone, name: name || `Student (${phone.slice(-4)})`, provider: 'phone' }
  });

  res.json({ user: toPublicUser(user), token: createToken(user.id) });
}));

export default router;

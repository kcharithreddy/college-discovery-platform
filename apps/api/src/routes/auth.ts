import { randomInt } from 'crypto';
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { OAuth2Client } from 'google-auth-library';
import { config } from '../config';
import { prisma } from '../prisma';
import { asyncHandler, toPublicUser } from '../utils';

const router = Router();
const googleClient = new OAuth2Client(config.googleClientId);

const DEMO_OTP = '123456';
const OTP_TTL_MS = 5 * 60 * 1000;

// In-memory OTP store. Fine for a single instance; use Redis or a DB table when scaling out.
const otpStore = new Map<string, { code: string; expiresAt: number }>();

const phoneSchema = z.string().trim().regex(/^\d{10}$/, 'Phone number must be a 10-digit number');

const authSchema = z.object({
  name: z.string().trim().min(2).max(60).optional(),
  email: z.string().trim().email().transform(email => email.toLowerCase()),
  password: z.string().min(6).max(100)
});

const googleAuthSchema = z.object({
  credential: z.string().min(1, 'Google credential token is required')
});

const sendOtpSchema = z.object({ phone: phoneSchema });

const verifyOtpSchema = z.object({
  phone: phoneSchema,
  otp: z.string().trim().length(6, 'OTP must be 6 digits'),
  name: z.string().trim().min(2).max(60).optional()
});

function createToken(userId: string) {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '7d' });
}

router.post('/register', asyncHandler(async (req, res) => {
  const parsed = authSchema.safeParse(req.body);
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
      password: await bcrypt.hash(parsed.data.password, 10),
      provider: 'credentials'
    }
  });

  res.status(201).json({ user: toPublicUser(user), token: createToken(user.id) });
}));

router.post('/login', asyncHandler(async (req, res) => {
  const parsed = authSchema.omit({ name: true }).safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  const ok = user?.password ? await bcrypt.compare(parsed.data.password, user.password) : false;
  if (!user || !ok) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  res.json({ user: toPublicUser(user), token: createToken(user.id) });
}));

// Verifies a Google Identity Services ID token sent by the frontend.
router.post('/google', asyncHandler(async (req, res) => {
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

router.post('/mobile/send-otp', asyncHandler(async (req, res) => {
  const parsed = sendOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid phone number format', errors: parsed.error.flatten() });
    return;
  }

  const { phone } = parsed.data;
  const code = config.demoOtp ? DEMO_OTP : String(randomInt(0, 1_000_000)).padStart(6, '0');
  otpStore.set(phone, { code, expiresAt: Date.now() + OTP_TTL_MS });

  // TODO: deliver `code` via an SMS provider when demo mode is off.
  res.json({
    message: `OTP sent successfully to +91 ${phone}`,
    ...(config.demoOtp ? { demoOtp: code } : {})
  });
}));

router.post('/mobile/verify-otp', asyncHandler(async (req, res) => {
  const parsed = verifyOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
    return;
  }

  const { phone, otp, name } = parsed.data;
  const stored = otpStore.get(phone);
  if (!stored || stored.code !== otp || stored.expiresAt < Date.now()) {
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

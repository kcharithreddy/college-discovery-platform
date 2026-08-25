import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../prisma';
import { asyncHandler, getJwtSecret } from '../utils';

const router = Router();

// Simple in-memory OTP store for phone authentication
const otpStore = new Map<string, { code: string; expiresAt: number }>();

const authSchema = z.object({
  name: z.string().trim().min(2).max(60).optional(),
  email: z.string().trim().email().transform(email => email.toLowerCase()),
  password: z.string().min(6).max(100)
});

const googleAuthSchema = z.object({
  email: z.string().trim().email().transform(email => email.toLowerCase()),
  name: z.string().trim().min(2).max(60).optional()
});

const sendOtpSchema = z.object({
  phone: z.string().trim().regex(/^\d{10}$/, 'Phone number must be a 10-digit number')
});

const verifyOtpSchema = z.object({
  phone: z.string().trim().regex(/^\d{10}$/, 'Phone number must be a 10-digit number'),
  otp: z.string().trim().length(6, 'OTP must be 6 digits'),
  name: z.string().trim().min(2).max(60).optional()
});

function createToken(userId: string) {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: '7d' });
}

// 1. Standard Email & Password Registration
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
    },
    select: { id: true, name: true, email: true, phone: true, provider: true }
  });

  res.status(201).json({ user, token: createToken(user.id) });
}));

// 2. Standard Email & Password Login
router.post('/login', asyncHandler(async (req, res) => {
  const parsed = authSchema.omit({ name: true }).safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
    return;
  }

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (!user || !user.password) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  const ok = await bcrypt.compare(parsed.data.password, user.password);
  if (!ok) {
    res.status(401).json({ message: 'Invalid email or password' });
    return;
  }

  res.json({
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, provider: user.provider },
    token: createToken(user.id)
  });
}));

// 3. Google Sign-In / Register
router.post('/google', asyncHandler(async (req, res) => {
  const parsed = googleAuthSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
    return;
  }

  const { email, name } = parsed.data;
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const derivedName = name || email.split('@')[0].replace(/[._-]/g, ' ') || 'Google Student';
    user = await prisma.user.create({
      data: {
        email,
        name: derivedName.charAt(0).toUpperCase() + derivedName.slice(1),
        provider: 'google'
      }
    });
  }

  res.json({
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, provider: user.provider },
    token: createToken(user.id)
  });
}));

// 4. Send Mobile OTP
router.post('/mobile/send-otp', asyncHandler(async (req, res) => {
  const parsed = sendOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid phone number format', errors: parsed.error.flatten() });
    return;
  }

  const { phone } = parsed.data;
  const code = '123456'; // Default OTP for fast demo testing
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore.set(phone, { code, expiresAt });

  res.json({
    message: `OTP sent successfully to +91 ${phone}`,
    demoOtp: code
  });
}));

// 5. Verify Mobile OTP & Login/Register
router.post('/mobile/verify-otp', asyncHandler(async (req, res) => {
  const parsed = verifyOtpSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input', errors: parsed.error.flatten() });
    return;
  }

  const { phone, otp, name } = parsed.data;
  const stored = otpStore.get(phone);

  // Validate OTP (allow default 123456 as backup)
  const isValidOtp = (stored && stored.code === otp && stored.expiresAt > Date.now()) || otp === '123456';
  if (!isValidOtp) {
    res.status(400).json({ message: 'Invalid or expired OTP. Please use OTP: 123456' });
    return;
  }

  otpStore.delete(phone);

  let user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        phone,
        name: name || `Student (${phone.slice(-4)})`,
        provider: 'phone'
      }
    });
  }

  res.json({
    user: { id: user.id, name: user.name, email: user.email, phone: user.phone, provider: user.provider },
    token: createToken(user.id)
  });
}));

export default router;

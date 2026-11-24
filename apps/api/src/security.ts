import type { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import type { AuthRequest } from './middleware/auth';

const MINUTE = 60 * 1000;

const tooMany = (message: string) => ({ message });

/**
 * Security headers for a JSON API: no framing, no MIME sniffing, no referrer leaks,
 * HSTS in production, and a locked-down CSP (the API never serves HTML).
 */
export const securityHeaders = helmet({
  contentSecurityPolicy: { directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] } },
  crossOriginResourcePolicy: { policy: 'same-site' },
  referrerPolicy: { policy: 'no-referrer' }
});

/** Every API route: generous for real users, stops scraping and floods. */
export const apiLimiter = rateLimit({
  windowMs: 15 * MINUTE,
  limit: 600,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: tooMany('Too many requests, please slow down and try again in a few minutes.')
});

/** Password login / register / Google login: blocks password guessing. */
export const authLimiter = rateLimit({
  windowMs: 15 * MINUTE,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: tooMany('Too many login attempts. Please wait 15 minutes and try again.')
});

/** Sending OTPs: limited per phone number AND per IP, to stop SMS flooding. */
export const otpSendLimiter = rateLimit({
  windowMs: 60 * MINUTE,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req: Request) => `${ipKeyGenerator(req.ip ?? '')}:${String(req.body?.phone ?? '')}`,
  message: tooMany('Too many OTP requests. Please try again in an hour.')
});

/** Verifying OTPs from one IP (each OTP also allows only a few attempts, see auth routes). */
export const otpVerifyLimiter = rateLimit({
  windowMs: 15 * MINUTE,
  limit: 15,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: tooMany('Too many OTP attempts. Please wait 15 minutes and try again.')
});

/** Writing reviews and saving colleges: per logged-in user, falling back to IP. */
export const writeLimiter = rateLimit({
  windowMs: 60 * MINUTE,
  limit: 60,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req: Request) => (req as AuthRequest).userId ?? ipKeyGenerator(req.ip ?? ''),
  message: tooMany('Too many changes in a short time. Please try again later.')
});

/** Turn body-parser errors into clean 4xx responses instead of 500s with stack traces in logs. */
export function bodyErrorHandler(err: Error & { type?: string; status?: number }, _req: Request, res: Response, next: NextFunction) {
  if (err.type === 'entity.parse.failed') {
    res.status(400).json({ message: 'Malformed JSON' });
    return;
  }
  if (err.type === 'entity.too.large') {
    res.status(413).json({ message: 'Request body too large' });
    return;
  }
  next(err);
}

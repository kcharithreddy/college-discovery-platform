import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export type AuthRequest = Request & { userId?: string };

export const JWT_ALGORITHM = 'HS256' as const;
export const JWT_ISSUER = 'college-discovery-api';

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Missing auth token' });
    return;
  }

  try {
    const token = header.slice('Bearer '.length);
    // Pin the algorithm and issuer so forged tokens (e.g. "alg: none") are rejected.
    const payload = jwt.verify(token, config.jwtSecret, { algorithms: [JWT_ALGORITHM], issuer: JWT_ISSUER }) as { userId?: unknown };
    if (typeof payload.userId !== 'string' || !payload.userId) throw new Error('bad payload');
    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

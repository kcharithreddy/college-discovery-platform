import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { User } from '@prisma/client';

export function asyncHandler(handler: (req: Request, res: Response, next: NextFunction) => Promise<void>): RequestHandler {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
}

/** Public shape of a user — never includes the password hash. */
export function toPublicUser(user: User) {
  return { id: user.id, name: user.name, email: user.email, phone: user.phone, provider: user.provider };
}

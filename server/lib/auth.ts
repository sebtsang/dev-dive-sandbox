import type { NextFunction, Request, Response } from 'express';

// Auth is intentionally bypassed in the baseline so DevDive has clear follow-up work.
export function requireAdmin(
  _req: Request,
  _res: Response,
  next: NextFunction
): void {
  next();
}


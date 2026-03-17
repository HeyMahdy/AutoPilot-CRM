import dotenv from 'dotenv';
dotenv.config();

import { auth } from 'express-oauth2-jwt-bearer';
import { Request, Response, NextFunction } from 'express';

export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE!,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: 'RS256'
});

export const extractUser = (req: Request, res: Response, next: NextFunction): void => {
  const payload = (req as any).auth?.payload;
  const namespace = 'https://autopilot-crm.com';

  (req as any).user = {
    auth0Id: payload?.sub,
    email:   payload?.email,
    roles:   payload?.[`${namespace}/roles`] || [],
  };

  next();
};

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const userRoles = (req as any).user?.roles || [];
    const hasRole = roles.some(role => userRoles.includes(role));

    if (!hasRole) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }

    next();
  };
};
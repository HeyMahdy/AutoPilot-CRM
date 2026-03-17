import { Router, Request, Response } from 'express';
import { checkJwt, extractUser, requireRole } from '../middleware/auth';
import { auth0Management } from '../config/auth0';

const router = Router();

// Public — no token needed
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Auth0 backend is running' });
});

// Protected — needs valid JWT
router.get('/me', checkJwt, extractUser, (req: Request, res: Response) => {
  res.json({ user: (req as any).user });
});

// Protected — needs valid JWT + rep role
router.get('/rep-only', checkJwt, extractUser, requireRole('rep', 'admin'), (req: Request, res: Response) => {
  res.json({ message: 'You are a rep or admin' });
});

// Test Auth0 Management API connection
router.get('/test-auth0', async (req: Request, res: Response) => {
  try {
    const response = await auth0Management.users.list({
      per_page: 5,
      page: 0,
    });
    res.json({
      status: 'Auth0 Management API connected ✓',
      total_users: response.data.length,
      users: response.data.map((u: any) => ({ email: u.email, id: u.user_id }))
    });
  } catch (err: any) {
    res.status(500).json({
      error: 'Auth0 connection failed',
      detail: err.message
    });
  }
});

export default router;
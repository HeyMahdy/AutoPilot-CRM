import { Router } from 'express';
import { getPool } from '../db/pool';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  const pool = getPool();
  const { rows } = await pool.query<{ now: string }>('select now()');
  res.json({ status: 'ok', db_time: rows[0]?.now });
});


import { Router } from 'express';
import { z } from 'zod';
import { getPool } from '../db/pool';

export const leadsRouter = Router();

const LeadCreateSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  company: z.string().min(1).optional(),
  status: z.string().min(1).optional(),
});

leadsRouter.get('/', async (_req, res) => {
  const pool = getPool();
  const { rows } = await pool.query(
    'select id, email, name, company, status, created_at, updated_at from leads order by created_at desc limit 100'
  );
  res.json({ items: rows });
});

leadsRouter.post('/', async (req, res) => {
  const body = LeadCreateSchema.parse(req.body ?? {});
  const pool = getPool();
  const { rows } = await pool.query(
    `insert into leads (email, name, company, status)
     values ($1, $2, $3, coalesce($4, 'new'))
     returning id, email, name, company, status, created_at, updated_at`,
    [body.email ?? null, body.name ?? null, body.company ?? null, body.status ?? null]
  );
  res.status(201).json(rows[0]);
});


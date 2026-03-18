import { Pool } from 'pg';
import { env } from '../server/env';

let _pool: Pool | null = null;

export function getPool() {
  if (_pool) return _pool;

  _pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: env.DATABASE_SSL ? { rejectUnauthorized: false } : undefined,
    max: 10,
    idleTimeoutMillis: 30_000,
  });

  return _pool;
}


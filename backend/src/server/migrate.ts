import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { getPool } from '../db/pool';

export async function migrate() {
  const pool = getPool();
  const schemaPath = path.resolve(__dirname, '..', 'db', 'schema.sql');
  const sql = await readFile(schemaPath, 'utf8');
  await pool.query(sql);
}


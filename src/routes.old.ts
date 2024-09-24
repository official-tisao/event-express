import { Router, Request, Response } from 'express';
import { pool } from './app';
import logger from './configs/logger';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
  } catch (err: any) {
    console.error(err.message);
    logger.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
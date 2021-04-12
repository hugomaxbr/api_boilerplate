import { Response } from 'express';
import AppError from '../errors/appError';

export function errorHandler(err: Error, res: Response): Response {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  return res.status(500).json({ error: 'Internal server error' });
}

import type { Request, Response, NextFunction } from 'express';

interface errorStatus extends Error {
  status?: number;
}

export function errorHandler(
    err: errorStatus,
    req: Request,
    res: Response,
    next: NextFunction 
): void {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: {
        message: err.message || 'Internal Server Error',
        status: statusCode,
    },
  });
}
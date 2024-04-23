import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(error);
  } else {
    res
      .status(500)
      .send((error as Error).message || 'Error occurred unexpectedly');
  }
};

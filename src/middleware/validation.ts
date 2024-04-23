import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (schema: yup.AnyObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        headers: req.headers,
        params: req.params,
        body: req.body,
        query: req.query
      });
      return next();
    } catch (err: unknown) {
      return res
        .status(400)
        .json({ type: (err as Error).name, message: (err as Error).message });
    }
  };

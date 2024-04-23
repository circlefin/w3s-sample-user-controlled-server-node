import { circleUserSdk } from '../services';
import { Request, Response, NextFunction } from 'express';

export const getTokenDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleUserSdk.getToken({
      id: req.params.id
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

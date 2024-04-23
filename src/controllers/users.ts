import { UUID, randomUUID } from 'crypto';
import { circleUserSdk } from '../services';
import { Request, Response, NextFunction } from 'express';

/* Users circle sdk calls */
export const createUser = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUserId: UUID = randomUUID();
    await circleUserSdk.createUser({
      userId: newUserId
    });
    res.status(200).send({ userId: newUserId });
  } catch (error: unknown) {
    next(error);
  }
};

export const createUserToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleUserSdk.createUserToken({
      userId: req.body.userId
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const initializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleUserSdk.createUserPinWithWallets({
      userId: req.body.userId,
      blockchains: req.body?.blockchains ?? ['MATIC-AMOY'],
      accountType: req.body?.accountType
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleUserSdk.getUser({
      userId: req.params.id
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const restorePin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleUserSdk.restoreUserPin({
      userToken: req.headers['token'] as string
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

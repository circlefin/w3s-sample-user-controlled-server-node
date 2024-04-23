import { circleUserSdk } from '../services';
import { Request, Response, NextFunction } from 'express';

export const getWalletTokenBalance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleUserSdk.getWalletTokenBalance({
      userToken: req.headers['token'] as string,
      walletId: req.params.id,
      // Yup validation in the middleware allows the spread of the req.query valid.
      ...req.query
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const listWallets = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleUserSdk.listWallets({
      userToken: req.headers['token'] as string,
      // Yup validation in the middleware allows the spread of the req.query valid.
      ...req.query
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const getWallet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleUserSdk.getWallet({
      userToken: req.headers['token'] as string,
      id: req.params.id
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

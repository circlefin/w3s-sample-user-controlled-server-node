import { circleUserSdk } from '../services';
import { Request, Response, NextFunction } from 'express';
import { getFeeConfiguration } from '../shared/utils';

export const listTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleUserSdk.listTransactions({
      userToken: req.headers['token'] as string,
      ...req.query
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const feeConfig = getFeeConfiguration(req);
    if (!feeConfig) {
      throw new Error('Invalid fee configuration');
    }

    const response = await circleUserSdk.createTransaction({
      userToken: req.headers['token'] as string,
      // Yup validation in the middleware allows the spread of the req.body valid.
      fee: feeConfig,
      idempotencyKey: req.body.idempotencyKey,
      refId: req.body.refId,
      amounts: req.body.amounts,
      destinationAddress: req.body.destinationAddress,
      nftTokenIds: req.body.nftTokenIds,
      tokenId: req.body.tokenId,
      walletId: req.body.walletId
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const getTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleUserSdk.getTransaction({
      userToken: req.headers['token'] as string,
      id: req.params.id,
      ...req.query
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const validateAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleUserSdk.validateAddress({
      ...req.body
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

export const estimateTransferFee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await circleUserSdk.estimateTransferFee({
      userToken: req.headers['token'],
      ...req.body
    });
    res.status(200).send(response.data);
  } catch (error: unknown) {
    next(error);
  }
};

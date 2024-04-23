import { Request } from 'express';
import { FeeConfiguration } from '../middleware/types/types';

export const getFeeConfiguration = (req: Request): FeeConfiguration | null => {
  const body = req.body;
  if (body?.feeLevel) {
    return {
      type: 'level',
      config: {
        feeLevel: body.feeLevel
      }
    };
  } else if (body?.gasLimit && body?.gasPrice) {
    return {
      type: 'gas',
      config: {
        gasLimit: body.gasLimit,
        gasPrice: body.gasPrice
      }
    };
  } else if (body?.maxFee && body?.priorityFee && body?.gasLimit) {
    return {
      type: 'absolute',
      config: {
        maxFee: body.maxFee,
        priorityFee: body.priorityFee,
        gasLimit: body.gasLimit
      }
    };
  } else {
    return null;
  }
};

// Copyright (c) 2024, Circle Technologies, LLC. All rights reserved.
//
// SPDX-License-Identifier: Apache-2.0
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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

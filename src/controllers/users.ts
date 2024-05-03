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

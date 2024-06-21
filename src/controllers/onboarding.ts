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
import { circleUserSdk, userDAO } from '../services';
import { Request, Response, NextFunction } from 'express';
import { User } from '../middleware';
import { hash, compare } from 'bcrypt';
import { CreateUserWithPinChallenge200Response } from '@circle-fin/user-controlled-wallets/dist/types/clients/user-controlled-wallets';
import { TrimDataResponse } from '@circle-fin/user-controlled-wallets/dist/types/clients/core';
import { logger } from '../services/logging/logger';

export const signUpCallback = (req: Request, res: Response) =>
  async function (err: Error | null, rows: User[]) {
    if (err) {
      throw err;
    } else if (rows.length > 0) {
      // user already signed up
      res.status(201).send({});
    } else {
      // user is new
      const newUserId: UUID = randomUUID();
      await circleUserSdk.createUser({
        userId: newUserId
      });
      const tokenResponse = await circleUserSdk.createUserToken({
        userId: newUserId
      });
      const challengeResponse = await circleUserSdk.createUserPinWithWallets({
        userId: newUserId,
        blockchains: ['MATIC-AMOY'],
        accountType: 'SCA'
      });
      // insert User into DB
      userDAO.insertUser(
        newUserId,
        req.body.email,
        await hash(req.body.password, 10)
      );
      logger.info(
        `New user inserted into DB, userId: ${newUserId}, email: ${req.body.email}`
      );
      res.status(200).send({
        userId: newUserId,
        userToken: tokenResponse.data?.userToken,
        encryptionKey: tokenResponse.data?.encryptionKey,
        challengeId: challengeResponse.data?.challengeId
      });
    }
  };
export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    userDAO.getUserByEmail(req.body.email, signUpCallback(req, res));
  } catch (error: unknown) {
    next(error);
  }
};

export const signInCallback = (req: Request, res: Response) =>
  async function (err: Error | null, rows: User[]) {
    if (err) {
      throw err;
    } else if (rows.length > 0) {
      const user = rows[0];
      const passwordMatches = await compare(req.body.password, user.password);
      if (!passwordMatches) {
        // password invalid
        res.sendStatus(401);
        return;
      }

      // valid credentials
      const tokenResponse = await circleUserSdk.createUserToken({
        userId: user.userId
      });
      const userResponse = await circleUserSdk.getUser({
        userId: user.userId
      });
      let challengeResponse:
        | TrimDataResponse<CreateUserWithPinChallenge200Response>
        | undefined = undefined;
      if (
        userResponse.data?.user?.pinStatus !== 'ENABLED' ||
        userResponse.data?.user?.securityQuestionStatus !== 'ENABLED'
      ) {
        // when user has not enabled their PIN or security questions yet
        challengeResponse = await circleUserSdk.createUserPinWithWallets({
          userId: user.userId,
          blockchains: ['MATIC-AMOY'],
          accountType: 'SCA'
        });
      }
      res.status(200).send({
        userId: user.userId,
        userToken: tokenResponse.data?.userToken,
        encryptionKey: tokenResponse.data?.encryptionKey,
        challengeId: challengeResponse?.data?.challengeId
      });
    } else {
      // invalid credentials or user does not exist
      res.sendStatus(404);
    }
  };

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    userDAO.getUserByEmail(req.body.email, signInCallback(req, res));
  } catch (error: unknown) {
    next(error);
  }
};

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

import express from 'express';
import {
  createUser,
  createUserToken,
  getUser,
  initializeUser,
  restorePin
} from '../controllers';
import {
  createUserTokenSchema,
  initializeUserSchema,
  getUserSchema,
  validate,
  authMiddleware
} from '../middleware';

const users = express.Router();
const authUserRouter = express.Router();
authUserRouter.use(authMiddleware);

/**
 * POST - /users
 * Creates a user
 *
 * Returns:
 *  userId: UUID - the UUID of the newly created user
 */
users.post('/', createUser);

/**
 * GET - /users/:id
 * Gets the user object
 *
 * Params:
 *  id: string - the userId to retrieve
 *
 * Returns:
 *  - user object - Reference https://developers.circle.com/w3s/reference/getuser
 */
users.get('/:id', validate(getUserSchema), getUser);

/**
 * POST - /users/token
 * Creates a user token and encryption key
 *
 * Params:
 *  userId: string - the userId to create userToken and encryptionKey for
 *
 * Returns:
 *  userToken: string     - unique system generated JWT session token.
 *                          The token will expire after 60 minutes.
 *  encryptionKey: string - encryption key to use to execute challengeIds
 */
users.post('/token', validate(createUserTokenSchema), createUserToken);

/**
 * POST - /users/initialize
 * Creates a PIN setup and optionally, a new Wallet
 *
 * Params:
 *  userId: string        - the userId to create PIN for
 *  blockchains: [string] - the blockchains to create wallet on
 *  accountType: string   - accountType of the Wallet
 *                        - will default to "EOA" if not provided
 *
 * Returns:
 *  challengeId: string - used to initiate a challenge flow
 */
users.post('/initialize', validate(initializeUserSchema), initializeUser);

/**
 * POST - /users/pin/restore
 * Restore PIN flow
 *
 * Returns:
 *  challengeId: string - used to initiate a challenge flow for PIN restoration
 */
authUserRouter.post('/pin/restore', restorePin);

export { users, authUserRouter };

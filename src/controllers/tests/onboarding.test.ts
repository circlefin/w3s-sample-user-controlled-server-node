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

import { signUpCallback, signInCallback } from '../onboarding';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { hashSync } from 'bcrypt';
import {
  registerLogger,
  SampleServerLogger
} from '../../services/logging/logger';

jest.mock('../../services', () => ({
  circleUserSdk: {
    createUser: jest
      .fn()
      // first mock value
      .mockResolvedValueOnce({})
      // second mock value
      .mockRejectedValueOnce(new Error('Error occurred')),
    createUserToken: jest
      .fn()
      // first mock value
      .mockResolvedValue({
        data: {
          userToken: 'mockUserToken',
          encryptionKey: 'mockEncryptionKey'
        }
      }),
    createUserPinWithWallets: jest
      .fn()
      // first mock value
      .mockResolvedValueOnce({
        data: {
          challengeId: 'mockChallengeId'
        }
      })
      // second mock value
      .mockRejectedValueOnce(new Error('Invalid Input')),
    getUser: jest.fn().mockResolvedValueOnce({
      data: {
        user: {
          securityQuestionStatus: 'ENABLED',
          pinStatus: 'ENABLED'
        }
      }
    })
  },
  userDAO: {
    insertUser: jest.fn(() => Promise.resolve())
  }
}));

registerLogger(new SampleServerLogger());
const hashedPassword = hashSync('123', 10);

const user = {
  email: 'a@b.com',
  password: hashedPassword,
  userId: '1',
  createdAt: Date.now().toString()
};

describe('signUp', () => {
  test('Should return 200 on user created', async () => {
    const req = getMockReq({
      body: { email: 'a@b.com', password: '123' }
    });
    const { res } = getMockRes();

    await signUpCallback(req, res)(null, []);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('Should return 201 on repeated signup', async () => {
    const req = getMockReq({
      body: { email: 'a@b.com', password: '123' }
    });
    const { res } = getMockRes();

    await signUpCallback(req, res)(null, [user]);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({});
  });

  test('Should return 400 on error', async () => {
    const req = getMockReq({
      body: { email: 'a@b.com', password: '123' }
    });
    const { res } = getMockRes();

    try {
      await signUpCallback(req, res)(new Error('Error occurred'), []);
    } catch (err: unknown) {
      expect((err as Error).message).toBe('Error occurred');
    }
  });
});

describe('signIn', () => {
  test('Should return 200 on successful authentication', async () => {
    const req = getMockReq({
      body: { email: 'a@b.com', password: '123' }
    });
    const { res } = getMockRes();

    await signInCallback(req, res)(null, [user]);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('Should return 404 on user not found', async () => {
    const req = getMockReq({
      body: { email: 'a@b.com', password: '123' }
    });
    const { res } = getMockRes();

    await signInCallback(req, res)(null, []);
    expect(res.sendStatus).toHaveBeenCalledWith(404);
  });

  test('Should return 400 on error', async () => {
    const req = getMockReq({
      body: { email: 'a@b.com', password: '123' }
    });
    const { res } = getMockRes();

    try {
      await signInCallback(req, res)(new Error('Error occurred'), []);
    } catch (err: unknown) {
      expect((err as Error).message).toBe('Error occurred');
    }
  });
});

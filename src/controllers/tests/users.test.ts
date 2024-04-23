import { createUser, createUserToken, initializeUser } from '../users';
import { getMockReq, getMockRes } from '@jest-mock/express';

jest.mock('../../services', () => ({
  circleUserSdk: {
    createUser: jest
      .fn()
      // first mock value
      .mockResolvedValueOnce({})
      // second mock value
      .mockRejectedValueOnce(new Error('Invalid Input')),
    createUserToken: jest
      .fn()
      // first mock value
      .mockResolvedValueOnce({
        data: {
          userToken: 'mockUserToken',
          encryptionKey: 'mockEncryptionKey'
        }
      })
      // second mock value
      .mockRejectedValueOnce(new Error('Invalid Input')),
    createUserPinWithWallets: jest
      .fn()
      // first mock value
      .mockResolvedValueOnce({
        data: {
          challengeId: 'mockChallengeId'
        }
      })
      // second mock value
      .mockRejectedValueOnce(new Error('Invalid Input'))
  },
  db: {
    schema: {
      hasTable: jest.fn(() => Promise.resolve()),
      createTable: jest.fn(() => Promise.resolve())
    },
    where: jest.fn(() => Promise.resolve()),
    insert: jest.fn(() => Promise.resolve())
  }
}));

describe('createUser', () => {
  test('Should return 200 on successful', async () => {
    const req = getMockReq({
      body: {}
    });
    const { res, next } = getMockRes();

    await createUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('Should return 400 on error', async () => {
    const req = getMockReq({
      body: {}
    });
    const { res, next } = getMockRes();

    await createUser(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Invalid Input'));
  });
});

const mockTokenReturnValue = {
  data: {
    userToken: 'mockUserToken',
    encryptionKey: 'mockEncryptionKey'
  }
};

describe('createUserToken', () => {
  test('Should return 200 on successful', async () => {
    const req = getMockReq({
      body: {
        userId: 'mockUserId'
      }
    });
    const { res, next } = getMockRes();

    await createUserToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockTokenReturnValue.data);
  });

  test('Should return 400 on error', async () => {
    const req = getMockReq({
      body: {
        userId: 'mockUserId'
      }
    });
    const { res, next } = getMockRes();

    await createUserToken(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Invalid Input'));
  });
});

const mockInitializeReturnValue = {
  data: {
    challengeId: 'mockChallengeId'
  }
};

describe('initializeUser', () => {
  test('Should return 200 on successful', async () => {
    const req = getMockReq({
      body: {
        userId: 'mockId',
        blockchains: ['MATIC-AMOY'],
        accountType: 'SCA'
      }
    });
    const { res, next } = getMockRes();

    await initializeUser(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(mockInitializeReturnValue.data);
  });

  test('Should return 400 on error', async () => {
    const req = getMockReq({
      body: {
        userId: 'mockId',
        blockchains: ['MATIC-AMOY'],
        accountType: 'SCA'
      }
    });
    const { res, next } = getMockRes();

    await initializeUser(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Invalid Input'));
  });
});

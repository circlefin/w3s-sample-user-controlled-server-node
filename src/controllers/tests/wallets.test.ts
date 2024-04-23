import { getWalletTokenBalance, listWallets } from '../wallets';
import { getMockReq, getMockRes } from '@jest-mock/express';

jest.mock('../../services', () => ({
  circleUserSdk: {
    getWalletTokenBalance: jest
      .fn()
      // first mock value
      .mockResolvedValueOnce({
        data: {
          tokenBalances: []
        }
      })
      // second mock value
      .mockRejectedValueOnce(new Error('Expired Token')),
    listWallets: jest
      .fn()
      // first mock value
      .mockResolvedValueOnce({
        data: {
          wallets: []
        }
      })
      // second mock value
      .mockRejectedValueOnce(new Error('Expired Token'))
  }
}));

describe('getWalletTokenBalance', () => {
  test('Should return 200 on successful', async () => {
    const req = getMockReq({
      headers: { token: 'mockUserToken' },
      params: {
        id: 'mockWalletId'
      }
    });
    const { res, next } = getMockRes();

    await getWalletTokenBalance(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      tokenBalances: []
    });
  });

  test('Should return 400 on error', async () => {
    const req = getMockReq({
      headers: { token: 'expiredUserToken' },
      params: {
        id: 'mockWalletId'
      }
    });
    const { res, next } = getMockRes();

    await getWalletTokenBalance(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Expired Token'));
  });
});

describe('listWallets', () => {
  test('Should return 200 on successful', async () => {
    const req = getMockReq({
      headers: { token: 'mockUserToken' }
    });
    const { res, next } = getMockRes();

    await listWallets(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      wallets: []
    });
  });

  test('Should return 400 on error', async () => {
    const req = getMockReq({
      headers: { token: 'expiredUserToken' }
    });
    const { res, next } = getMockRes();

    await listWallets(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Expired Token'));
  });
});

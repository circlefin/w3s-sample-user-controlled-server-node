import { getTokenDetails } from '../tokens';
import { getMockReq, getMockRes } from '@jest-mock/express';

jest.mock('../../services', () => ({
  circleUserSdk: {
    getToken: jest
      .fn()
      // first mock value
      .mockResolvedValueOnce({
        data: {
          token: {}
        }
      })
      // second mock value
      .mockRejectedValueOnce(new Error('Error'))
  }
}));

describe('getTokenDetails', () => {
  test('Should return 200 on successful', async () => {
    const req = getMockReq({
      params: { id: 'tokenId' }
    });
    const { res, next } = getMockRes();

    await getTokenDetails(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      token: {}
    });
  });

  test('Should return 400 on error', async () => {
    const req = getMockReq({
      params: { id: 'wrongTokenId' }
    });
    const { res, next } = getMockRes();

    await getTokenDetails(req, res, next);
    expect(next).toHaveBeenCalledWith(new Error('Error'));
  });
});

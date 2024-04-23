import { NextFunction, Request, Response } from 'express';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers['authorization'];

  if (!bearerHeader) {
    return res.sendStatus(403);
  }

  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];

  const { exp } = JSON.parse(
    Buffer.from(bearerToken.split('.')[1], 'base64').toString()
  );

  if (Date.now() > exp * 1000) {
    return res.sendStatus(403);
  }

  req.headers.token = bearerToken;

  next();
};

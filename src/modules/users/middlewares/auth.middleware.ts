import { Request, Response, NextFunction } from 'express';
import { verify, Secret } from 'jsonwebtoken';
import AppError from '../../../shared/errors/app.errors';
import authConfig from '@config/auth.config';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT missing', 511);
  }
  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodeToken as ITokenPayload;

    req.user = { id: sub };

    return next();
  } catch {
    throw new AppError('Invalid JWT', 423);
  }
}

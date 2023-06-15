import { NextFunction, Request, Response } from 'express';
import JwtAuthorization from '../utils/jwtFunctions';
import RequestError from '../Interfaces/errors/RequestError';

export type JwtPayload = {
  id: number;
  email: string;
  iat: number;
};

export type AuthenticatedRequest = Request & {
  payload: JwtPayload,
};

export default class TokenValidation {
  static validateToken(req: Request, res: Response, next: NextFunction): void {
    const { authorization: token } = req.headers;
    if (!token) {
      const error = new RequestError({ name: 'unauthorized', message: 'Token not found' });
      return next(error);
    }

    try {
      const payload = JwtAuthorization.verifyToken(token) as JwtPayload;
      (req as AuthenticatedRequest).payload = payload;
      return next();
    } catch (e) {
      const error = new RequestError({
        name: 'unauthorized',
        message: 'Token must be a valid token' });
      return next(error);
    }
  }
}

import { NextFunction, Request, Response } from 'express';
import RequestError from '../Interfaces/errors/RequestError';

export default class ValidateRequest {
  static validateLogin(req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new RequestError({
        name: 'unauthorized',
        message: 'All fields must be filled',
      });

      return next(error);
    }
    return next();
  }
}

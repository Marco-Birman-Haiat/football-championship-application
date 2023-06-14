import { NextFunction, Request, Response } from 'express';

export default class ValidateRequest {
  static validateLogin(req: Request, res: Response, next: NextFunction): void {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error();
      error.name = 'INVALID_DATA';
      error.message = 'All fields must be filled';
      return next(error);
    }
    next();
  }
}

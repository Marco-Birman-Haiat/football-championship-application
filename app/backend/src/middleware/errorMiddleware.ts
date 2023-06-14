import { NextFunction, Request, Response } from 'express';

export default class ErrorMiddleware {
  static catchError(error: Error, _req: Request, res: Response, _next: NextFunction): Response {
    return res.status(400).json({ message: error.message });
  }
}

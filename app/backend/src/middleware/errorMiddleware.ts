import { NextFunction, Request, Response } from 'express';
import RequestError from '../Interfaces/errors/RequestError';
import getErrorCode from '../utils/httpError';

export default class ErrorMiddleware {
  static catchError(
    error: Error | RequestError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Response {
    if (error instanceof RequestError) {
      return res.status(getErrorCode(error.name)).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
}

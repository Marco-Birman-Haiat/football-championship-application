import { Request, Response } from 'express';

import { ILoginService } from '../services/login.service';
import { AuthenticatedRequest } from '../middleware/tokenMiddleware';
import { IUserService } from '../services/user.service';
import getErrorCode from '../utils/httpError';

export interface ILoginController {
  login(req: Request, res: Response): Promise<Response>;
  getRoleById(req: Request, res: Response): Promise<Response>;
}

export default class LoginController implements ILoginController {
  constructor(
    private loginService: ILoginService,
    private userService: IUserService,
  ) {}

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const token = await this.loginService.login({ email, password });

    if (token.status === 'unauthorized') {
      return res.status(getErrorCode(token.status)).json(token.data);
    }
    return res.status(200).json(token.data);
  }

  async getRoleById(req: Request, res: Response): Promise<Response> {
    const { id } = (req as AuthenticatedRequest).payload;

    const foundRole = await this.userService.getRoleById(id.toString());

    if (foundRole.status === 'notFound') {
      return res.status(getErrorCode(foundRole.status)).json(foundRole.data);
    }
    return res.status(200).json(foundRole.data);
  }
}

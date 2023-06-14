import { Request, Response } from 'express';

import LoginService from '../services/login.service';

export interface ILoginController {
  login(req: Request, res: Response): Promise<Response>;
}

export default class LoginController implements ILoginController {
  constructor(private loginService: LoginService) {}

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const token = await this.loginService.login({ email, password });

    return res.status(200).json(token.data);
  }
}

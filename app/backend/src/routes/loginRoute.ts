import { Router } from 'express';

import LoginController from '../controllers/login.controller';
import LoginService from '../services/login.service';
import UserRepository from '../repositories/userRepository';
import ValidateRequest from '../middleware/requestValidation';
import TokenValidation from '../middleware/tokenMiddleware';
import UserService from '../services/user.service';

const loginRoute = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const loginService = new LoginService(userRepository);
const loginController = new LoginController(loginService, userService);

loginRoute.post(
  '/',
  ValidateRequest.validateLogin,
  async (req, res) => loginController.login(req, res),
);

loginRoute.get(
  '/role',
  TokenValidation.validateToken,
  async (req, res) => loginController.getRoleById(req, res),
);

export default loginRoute;

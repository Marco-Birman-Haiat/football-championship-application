import { Router } from 'express';

import LoginController from '../controllers/login.controller';
import LoginService from '../services/login.service';
import UserRepository from '../repositories/userRepository';
import JwtAuthorization from '../utils/jwtFunctions';

const loginRoute = Router();

const userRepository = new UserRepository();
const jtwUtils = new JwtAuthorization();
const loginService = new LoginService(userRepository, jtwUtils);
const loginController = new LoginController(loginService);

loginRoute.post('/', async (req, res) => loginController.login(req, res));

export default loginRoute;
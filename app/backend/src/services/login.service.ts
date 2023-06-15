import * as bcrypt from 'bcryptjs';

import { ServiceResponse } from '../Interfaces/responses/serviceResponse';
import { Login } from '../Interfaces/entities/userEntity';
import UserRepository from '../repositories/userRepository';
import validateLogin from './validations/validateLogin';
import JwtAuthorization from '../utils/jwtFunctions';

export interface ILoginService {
  login(userData: Login): Promise<ServiceResponse<{ token: string }>>;
}

export default class LoginService implements ILoginService {
  constructor(
    private userRepository: UserRepository,
  ) {}

  async login(userData: Login): Promise<ServiceResponse<{ token: string; }>> {
    const error = validateLogin.executeValidation(userData);
    if (error.status) return error;

    const foundUser = await this.userRepository.findByEmail(userData.email);

    if (!foundUser || !bcrypt.compareSync(userData.password, foundUser.password)) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }
    const tokenPayload = { id: foundUser.id, email: foundUser.email };
    const token = JwtAuthorization.createToken(tokenPayload);

    return { status: 'successful', data: { token } };
  }
}

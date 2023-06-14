import * as bcrypt from 'bcryptjs';

import { ServiceResponse } from '../Interfaces/responses/serviceResponse';
import { Login } from '../Interfaces/entities/userEntity';
import UserRepository from '../repositories/userRepository';
import { IJwtAuthorization } from '../utils/jwtFunctions';
import validateLogin from './validations/validateLogin';

export interface ILoginService {
  login(userData: Login): Promise<ServiceResponse<{ token: string }>>;
}

export default class LoginService implements ILoginService {
  constructor(
    private userRepository: UserRepository,
    private jwtUtils: IJwtAuthorization,
  ) {}

  async login(userData: Login): Promise<ServiceResponse<{ token: string; }>> {
    const error = validateLogin.executeValidation(userData);
    if (error.status) return error;

    const foundUser = await this.userRepository.findByEmail(userData.email);

    if (!foundUser || !bcrypt.compareSync(userData.password, foundUser.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'email and/or password incorrect' } };
    }
    const tokenPayload = { id: foundUser.id, email: foundUser.email };
    const token = this.jwtUtils.createToken(tokenPayload);

    return { status: 'SUCCESSFUL', data: { token } };
  }
}

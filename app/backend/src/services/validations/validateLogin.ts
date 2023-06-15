import { ValidationResponse } from '../../Interfaces/responses/validationResponse';
import { Login } from '../../Interfaces/entities/userEntity';
import { loginSchema } from './schemas';

export default class validateLogin {
  static executeValidation(userData: Login): ValidationResponse<string> {
    const { error } = loginSchema.validate(userData);

    if (error) return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    return { status: null, data: '' };
  }
}

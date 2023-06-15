import { ServiceResponse } from '../Interfaces/responses/serviceResponse';
import { IUserRepository } from '../repositories/userRepository';

export interface IUserService {
  getRoleById(id: string): Promise<ServiceResponse<{ role: string }>>;
}

export default class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  async getRoleById(id: string): Promise<ServiceResponse<{ role: string; }>> {
    const foundUser = await this.userRepository.findById(Number(id));

    if (!foundUser) return { status: 'notFound', data: { message: 'user not found' } };
    return { status: 'ok', data: { role: foundUser.role } };
  }
}

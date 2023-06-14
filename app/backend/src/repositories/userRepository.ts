import UserModel from '../database/models/user.model';
import { UserEntity } from '../Interfaces/entities/userEntity';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>
}

export default class UserRepository implements IUserRepository {
  private userModel = UserModel;

  async findByEmail(email: string): Promise<UserEntity | null> {
    const foundUser = await this.userModel.findOne({ where: { email } });

    if (!foundUser) return null;
    return foundUser.dataValues;
  }
}

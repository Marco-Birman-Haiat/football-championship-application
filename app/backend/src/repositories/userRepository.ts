import UserModel from '../database/models/user.model';
import { IUserResponse, UserEntity } from '../Interfaces/entities/userEntity';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: number): Promise<IUserResponse | null>
}

export default class UserRepository implements IUserRepository {
  private userModel = UserModel;

  async findByEmail(email: string): Promise<UserEntity | null> {
    const foundUser = await this.userModel.findOne({ where: { email } });

    if (!foundUser) return null;
    return foundUser.dataValues;
  }

  async findById(id: number): Promise<IUserResponse | null> {
    const foundUser = await this.userModel.findByPk(id);

    if (!foundUser) return null;
    return UserRepository.getRecordFromEntity(foundUser.dataValues);
  }

  private static getRecordFromEntity(user: UserEntity): IUserResponse {
    const { password, ...userRecord } = user;
    return userRecord;
  }
}

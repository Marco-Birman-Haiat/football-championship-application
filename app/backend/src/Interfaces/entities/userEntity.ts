import { Identifiable, NewEntity } from '..';

export interface Login {
  email: string;
  password: string;
}

export interface UserEntity extends Identifiable, Login {
  username: string;
  role: string;
}

export type TeamReponse = NewEntity<UserEntity>;

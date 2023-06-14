import * as jwt from 'jsonwebtoken';

const secret = process.env.JTW_SECRET || 'minhaSenhaMBH';

export type TokenPayload = {
  id: number;
  email: string;
};

export interface IJwtAuthorization {
  verifyToken(token: string): string | jwt.JwtPayload;
  createToken(payload: TokenPayload): string;
}

export default class JwtAuthorization implements IJwtAuthorization {
  private jwt = jwt;

  verifyToken(token: string): string | jwt.JwtPayload {
    return this.jwt.verify(token, secret);
  }

  createToken(payload: TokenPayload): string {
    return this.jwt.sign({ data: payload }, secret);
  }
}

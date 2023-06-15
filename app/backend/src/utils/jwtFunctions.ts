import * as jwt from 'jsonwebtoken';

const secret = process.env.JTW_SECRET || 'jwt_secret';

export type TokenPayload = {
  id: number;
  email: string;
};

export default class JwtAuthorization {
  static verifyToken(token: string): string | jwt.JwtPayload {
    return jwt.verify(token, secret);
  }

  static createToken(payload: TokenPayload): string {
    return jwt.sign(payload, secret);
  }
}

import * as jwt from 'jsonwebtoken';
import { IJWTService, Payload } from '../../application/services/jwtService';

class JWTService implements IJWTService {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  async generateToken(
    payload: { id: string },
    expiresIn: number,
  ): Promise<string> {
    return await jwt.sign(payload, this.secret, { expiresIn: `${expiresIn}d` });
  }

  async verifyToken(token: string): Promise<Payload | null> {
    try {
      return (await jwt.verify(token, this.secret)) as Payload;
    } catch (error) {
      return null;
    }
  }
}

export default JWTService;

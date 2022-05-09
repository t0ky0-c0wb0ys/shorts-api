import * as jwt from 'jsonwebtoken';
import { IJWTService } from '../../application/services/jwtService';

class JWTService implements IJWTService {
  private readonly secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  async generateToken(
    payload: { id: string },
    expiresIn: number,
  ): Promise<string> {
    return jwt.sign(payload, this.secret, { expiresIn: `${expiresIn}d` });
  }
}

export default JWTService;

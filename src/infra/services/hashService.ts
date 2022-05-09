import { hash, compare } from 'bcrypt';
import { IHashService } from '../../application/services/hashService';

class HashService implements IHashService {
  private SALT_ROUNDS = 10;

  async hashPassword(password: string): Promise<string> {
    return await hash(password, this.SALT_ROUNDS);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}

export default HashService;

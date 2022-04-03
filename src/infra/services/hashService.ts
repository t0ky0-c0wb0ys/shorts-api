import { hash } from 'bcrypt';
import { IHashService } from '../../application/services/hashService';

class HashService implements IHashService {
  private SALT_ROUNDS = 10;

  async hashPassword(password: string): Promise<string> {
    return hash(password, this.SALT_ROUNDS);
  }
}

export default HashService;

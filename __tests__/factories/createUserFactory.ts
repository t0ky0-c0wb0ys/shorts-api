import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import User from '../../src/domain/entities/user/user';

const createUserFactory = (): User => {
  const user = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(8),
    id: randomUUID(),
  };
  return User.create(
    user.username,
    user.email,
    user.password,
    '',
    user.id,
  ) as User;
};

export default createUserFactory;

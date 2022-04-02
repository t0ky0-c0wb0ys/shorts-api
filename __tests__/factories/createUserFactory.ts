import { faker } from '@faker-js/faker';
import User from '../../src/domain/entities/user/user';

const createUserFactory = (): User => {
  const user = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(8),
  };
  return User.create(user.username, user.email, user.password) as User;
};

export default createUserFactory;

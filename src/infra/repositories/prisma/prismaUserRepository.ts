import { PrismaClient } from '@prisma/client';
import User from '../../../domain/entities/user/user';
import { IUserRepository } from '../../../application/repositories/userRepository';

const prisma = new PrismaClient();

class PrismaUserRepository implements IUserRepository {
  async create(
    id: string,
    username: string,
    email: string,
    hashedPassword: string,
    createdAt: Date,
    updatedAt: Date,
  ): Promise<User> {
    const newUser = await prisma.user.create({
      data: {
        id,
        username,
        email,
        hashedPassword,
        createdAt,
        updatedAt,
      },
    });

    return User.create(
      newUser.username,
      newUser.email,
      '',
      newUser.hashedPassword,
      newUser.id,
      newUser.createdAt,
      newUser.updatedAt,
    ) as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return User.create(
        user.username,
        user.email,
        '',
        user.hashedPassword,
        user.id,
        user.createdAt,
        user.updatedAt,
      ) as User;
    }

    return null;
  }
}

export default PrismaUserRepository;

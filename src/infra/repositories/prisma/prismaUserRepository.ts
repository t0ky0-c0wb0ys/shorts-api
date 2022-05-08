import { PrismaClient } from '@prisma/client';
import User from '../../../domain/entities/user/user';
import { IUserRepository } from '../../../application/repositories/userRepository';
import Username from '../../../domain/entities/user/username';
import Email from '../../../domain/valueObjects/email/email';

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

    return new User(
      newUser.id,
      new Username(newUser.username),
      new Email(newUser.email),
      newUser.hashedPassword,
      newUser.createdAt,
      newUser.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return new User(
        user.id,
        new Username(user.username),
        new Email(user.email),
        user.hashedPassword,
        user.createdAt,
        user.updatedAt,
      );
    }

    return null;
  }
}

export default PrismaUserRepository;

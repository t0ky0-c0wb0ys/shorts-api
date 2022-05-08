import User from '../../domain/entities/user/user';

export interface IUserRepository {
  create(
    id: string,
    username: string,
    email: string,
    hashedPassword: string,
    createdAt: Date,
    updatedAt: Date,
  ): Promise<User>;
  findByEmailOrUsername(email: string, username: string): Promise<User | null>;
}

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
  findByEmail(email: string): Promise<User | null>;
}

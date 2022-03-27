interface UserData {
  username: string;
  email: string;
  password?: string;
  passwordHashed?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default UserData;

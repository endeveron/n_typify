import { ObjectId } from 'mongoose';

export enum UserRole {
  user = 'user',
  admin = 'admin',
}

export type User = {
  _id: ObjectId;
  // role: UserRole;
  // id?: string;
  // name?: string;
  // username?: string;
  // email?: string;
  // emailVerified?: boolean;
  // password?: string;
  // image?: string;
};

export type TUserData = {
  name: string;
  email: string;
};

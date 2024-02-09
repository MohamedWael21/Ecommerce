import { Model } from "mongoose";
import { Image } from "./products";
import UserModelConstructor from "../models/users";
export interface User {
  name: string;
  email: string;
  password: string;
  avatar?: Image;
  role: string;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

export interface UserMethods {
  getJwtToken(): string;
  comparePassword(password: string): boolean;
  getPasswordResetToken(): string;
}

export type UserModel = Model<User, {}, UserMethods>;

export type UserDocument = InstanceType<typeof UserModelConstructor>;

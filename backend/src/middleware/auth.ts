import { NextFunction, Request, Response } from "express";
import catchAsyncError from "./catchAsyncError";
import MyError from "../utils/MyError";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/users";
type Payload = {
  id: string;
};
export const isAuthUser = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
      return next(new MyError("Please Login to access this resource", 401));
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET!) as Payload;

    const user = await User.findById(id);
    if (user) {
      req.user = user;
    }
    next();
  }
);

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role!)) {
      return next(
        new MyError(
          `Role: ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

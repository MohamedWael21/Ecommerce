import { NextFunction, Request, Response } from "express";
import MyError from "../utils/MyError";

export default function handleError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // wrong mongodb id
  if (err.name === "CastError") {
    console.log(err);
    const message = `Resource not Found. Invalid: ${req.path}`;
    err = new MyError(message, 400);
  }

  //duplicate key
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)[0]} Entered`;
    err = new MyError(message, 400);
  }

  // wrong jwt token
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new MyError(message, 400);
  }

  // wrong jwt token
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is Expired, try again`;
    err = new MyError(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
}

import { CookieOptions, Response } from "express";
import { UserDocument } from "../types/users";

export default function sendToken(
  user: UserDocument,
  statusCode: number,
  res: Response
) {
  const token = user.getJwtToken();

  //options for cookie
  const options: CookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE!) * 24 * 60 * 60 * 1000
    ),
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
}

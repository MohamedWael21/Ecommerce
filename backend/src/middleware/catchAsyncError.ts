import { NextFunction, Response, Request } from "express";

const catchAsyncError =
  (handleFunc: Function) =>
  (req: Request, res: Response, next?: NextFunction) => {
    Promise.resolve(handleFunc(req, res, next)).catch(next);
  };

export default catchAsyncError;

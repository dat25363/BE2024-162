import { Request, Response, NextFunction } from "express";
import {STATUS_CODES, MESSAGES} from "../config/constant"
import CustomError from "../models/CustomError"


export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR; // Mặc định là 500 nếu không có statusCode
  const message = err.message;

  if(statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR){
    return res.status(statusCode).json({
      message: MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
  else {
    return res.status(statusCode).json({
      message: message,
    });
  }
};

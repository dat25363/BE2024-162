import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { STATUS_CODES, MESSAGES } from "../config/constant";
import CustomError from "../models/CustomError";
import { TOKEN } from "../config/constant";

export interface CustomRequest extends Request {
  user: string | JwtPayload;
}

// Middleware xác thực người dùng
export const authenticateByToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Lấy token từ header
  if (!token) {
    return next(
      new CustomError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED)
    );
  }

  jwt.verify(token, TOKEN.SECRET_KEY || "", (err, decoded) => {
    if (err) {
      return next(
        new CustomError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED)
      );
    }

    if (decoded) {
      (req as CustomRequest).user = decoded; // Gán thông tin người dùng vào req
    } else {
      return next(
        new CustomError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED)
      );
    }
    next();
  });
};

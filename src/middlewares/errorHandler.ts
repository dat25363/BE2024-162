import { Request, Response, NextFunction } from "express";
import {Messages} from "../config/constant"
import {STATUS_CODES} from "../config/constant"


export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR; // Mặc định là 500 nếu không có statusCode
  const message = err.message || Messages.INTERNAL_SERVER_ERROR;

  // Trả về phản hồi lỗi theo mã lỗi
  if (statusCode === STATUS_CODES.BAD_REQUEST) {
    return res.status(STATUS_CODES.BAD_REQUEST).json({ message: Messages.BAD_REQUEST, error: message });
  } else if (statusCode === STATUS_CODES.UNAUTHORIZED) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: Messages.UNAUTHORIZED, error: message });
  } else if (statusCode === STATUS_CODES.FORBIDDEN) {
    return res.status(STATUS_CODES.FORBIDDEN).json({ message: Messages.FORBIDDEN, error: message });
  } else {
    // Xử lý các lỗi khác
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: Messages.INTERNAL_SERVER_ERROR, error: message });
  }
};

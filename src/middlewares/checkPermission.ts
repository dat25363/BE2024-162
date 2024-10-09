import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "./auth";
import { checkGroupPermission } from "../utils/checkGroupPermissions";
import { STATUS_CODES, MESSAGES } from "../config/constant";
import CustomError from "../models/CustomError";
import { JwtPayload } from "jsonwebtoken";

// Định nghĩa kiểu dữ liệu cho payload của token người dùng

export const checkPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user as JwtPayload; // Lấy thông tin người dùng từ token
    // Kiểm tra xem người dùng có thuộc một nhóm hợp lệ không
    if (!user || !user.group) {
      const error = new CustomError(
        STATUS_CODES.BAD_REQUEST,
        MESSAGES.BAD_REQUEST
      );
      return next(error);
    }

    // Kiểm tra nếu nhóm tồn tại và có quyền cần thiết
    const havePermission = await checkGroupPermission(
      user.group,
      requiredPermission
    );
    if (user.group && havePermission) {
      return next(); // Nếu người dùng có quyền, tiếp tục middleware
    } else {
      const error = new CustomError(STATUS_CODES.FORBIDDEN, MESSAGES.FORBIDDEN);
      return next(error);
    }
  };
};

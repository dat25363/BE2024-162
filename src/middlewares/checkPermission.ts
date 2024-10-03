import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "./auth";
import { Groups } from "../security/permissions-groups";
import { checkGroupPermission } from "../utils/checkGroupPermissions";
import {STATUS_CODES} from "../config/constant"


// Định nghĩa kiểu dữ liệu cho payload của token người dùng
interface UserPayload {
  id: number;
  name: string;
  group: string; // Nhóm người dùng, ví dụ: Admin hoặc User
}

// Middleware kiểm tra quyền
export const checkPermission = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as CustomRequest).user as UserPayload; // Lấy thông tin người dùng từ token
    // Kiểm tra xem người dùng có thuộc một nhóm hợp lệ không
    if (!user || !user.group) {
      const error = new Error("invalid user or group");
      (error as any).statusCode = STATUS_CODES.FORBIDDEN;
      return next(error);
    }

    // Lấy thông tin nhóm người dùng từ tệp cấu hình
    const group = Groups[user.group]; // Tìm nhóm của người dùng

    // Kiểm tra nếu nhóm tồn tại và có quyền cần thiết

    if (group && checkGroupPermission(group, requiredPermission)) {
      return next(); // Nếu người dùng có quyền, tiếp tục middleware
    } else {
      const error = new Error("Forbidden");
      (error as any).statusCode = STATUS_CODES.FORBIDDEN;
      return next(error);
    }
  };
};

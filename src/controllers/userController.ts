import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";
import { STATUS_CODES } from "../config/constant";

const uService = new userService();
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone, pass } = req.body; // Lấy thông tin từ request body

  try {
    const user = await uService.login(phone, pass); // Gọi service
    res.status(STATUS_CODES.OK).json(user); // Trả về thông tin người dùng
  } catch (error) {
    next(error);
  }
};

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userList = await uService.getAllUser(); // Gọi service
    res.status(STATUS_CODES.OK).json(userList); // Trả về danh sách tất cả người dùng
  } catch (error) {
    next(error);
  }
};

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone, pass, group } = req.body;
  try {
    const user = await uService.addUser(phone, pass, group); // Gọi service
    res.status(STATUS_CODES.CREATED).json(user); // trả về tạo thành công
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone } = req.body; // Lấy thông tin từ request body

  try {
    const user = await uService.deleteUser(phone); // Gọi service
    res.status(STATUS_CODES.OK).json(user); // Trả về xóa thành công
  } catch (error) {
    next(error);
  }
};

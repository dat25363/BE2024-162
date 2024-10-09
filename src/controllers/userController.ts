import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/userService';

const uService = new userService();
export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { phone, pass } = req.body; // Lấy thông tin từ request body

  try {
    const user = await uService.login(phone, pass); // Gọi service
    res.status(200).json(user); // Trả về thông tin người dùng
  } catch (error) {
    next(error);
  }
};

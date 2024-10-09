import jwt from 'jsonwebtoken'; 
import bcrypt from 'bcrypt'; // Để mã hóa/mã giải mật khẩu
import prismaClient from "../index";
import CustomError from '../models/CustomError'; 
import {STATUS_CODES, MESSAGES} from '../config/constant'
import {generateToken} from '../utils/generateToken'


export class userService {
async login (phone: string, pass: string) {
  // Tìm người dùng dựa trên email
  const user = await prismaClient.users.findUnique({
    where: {phone: phone},
    include: { userGroup: true },
  });
  
  // Nếu không tìm thấy người dùng
  if (!user) {    
    throw new CustomError(STATUS_CODES.UNAUTHORIZED,MESSAGES.UNAUTHORIZED);
  }

  // Kiểm tra mật khẩu có khớp không
  const isPasswordValid = await bcrypt.compare(pass, user.pass);
  
  
  // Nếu mật khẩu không khớp
  if (!isPasswordValid) {
    throw new CustomError(STATUS_CODES.UNAUTHORIZED,MESSAGES.UNAUTHORIZED);
  }

  // Tạo JWT token
  const token = generateToken(
    { userId: user.id, group: user.userGroup.group_name },
  );

  // Trả về token và thông tin người dùng
  return {
    token,
    user: {
      id: user.id,
      phone: user.phone,
    },
  };
};
}
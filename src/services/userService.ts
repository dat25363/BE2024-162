import bcrypt from "bcrypt"; // Để mã hóa/mã giải mật khẩu
import prismaClient from "../index";
import { Prisma } from "@prisma/client";
import CustomError from "../models/CustomError";
import { STATUS_CODES, MESSAGES } from "../config/constant";
import { generateToken } from "../utils/generateToken";

export class userService {
  async login(phone: string, pass: string) {
    // Tìm người dùng dựa trên email
    const user = await prismaClient.users.findUnique({
      where: { phone: phone },
      include: { userGroup: true },
    });

    // Nếu không tìm thấy người dùng
    if (!user) {
      throw new CustomError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
    }

    // Kiểm tra mật khẩu có khớp không
    const isPasswordValid = await bcrypt.compare(pass, user.pass);

    // Nếu mật khẩu không khớp
    if (!isPasswordValid) {
      throw new CustomError(STATUS_CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
    }

    // Tạo JWT token
    const token = generateToken({
      userId: user.id,
      group: user.userGroup.group_name,
    });

    // Trả về token và thông tin người dùng
    return {
      token,
      user: {
        id: user.id,
        phone: user.phone,
      },
    };
  }

  async getAllUser() {
    try {
      const users = await prismaClient.users.findMany({
        include: {
          userGroup: true,
        },
      });
      return users;
    } catch (error) {
      throw new CustomError(STATUS_CODES.NOT_FOUND, MESSAGES.NOT_FOUND);
    }
  }

  async addUser(phone: string, pass: string, group: string) {
    if (!phone || !pass || !group) {
      throw new CustomError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST);
    }
    try {
      const userGroup = await prismaClient.userGroups.findUnique({
        where: { group_name: group },
      });

      if (!userGroup) {
        throw new CustomError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST); // nếu nhóm không tồn tại thì báo lỗi
      }

      const hashedPass = await bcrypt.hash(pass, 10);

      // tạo mới hoặc ghi đè thông tin người dùng
      const newUser = await prismaClient.users.upsert({
        where: { phone },
        update: {
          pass: hashedPass, // Cập nhật mật khẩu
          userGroup_id: userGroup.id, // Cập nhật nhóm người dùng
        },
        create: {
          // Tạo người dùng mới
          phone,
          pass: hashedPass,
          userGroup_id: userGroup.id,
        },
      });
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(phone: string) {
    if (!phone) {
      throw new CustomError(STATUS_CODES.BAD_REQUEST, MESSAGES.BAD_REQUEST);
    }

    try {
      // Xóa người dùng dựa trên số điện thoại
      const deletedUser = await prismaClient.users.delete({
        where: { phone: phone },
      });

      return deletedUser;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        // Prisma error P2025: Record to delete does not exist
        return new CustomError(STATUS_CODES.NOT_FOUND, MESSAGES.NOT_FOUND);
      }
      return new CustomError(
        STATUS_CODES.INTERNAL_SERVER_ERROR,
        MESSAGES.INTERNAL_SERVER_ERROR
      );
    }
  }
}

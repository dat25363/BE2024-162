"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt")); // Để mã hóa/mã giải mật khẩu
const index_1 = __importDefault(require("../index"));
const client_1 = require("@prisma/client");
const CustomError_1 = __importDefault(require("../models/CustomError"));
const constant_1 = require("../config/constant");
const generateToken_1 = require("../utils/generateToken");
class userService {
    login(phone, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            // Tìm người dùng dựa trên email
            const user = yield index_1.default.users.findUnique({
                where: { phone: phone },
                include: { userGroup: true },
            });
            // Nếu không tìm thấy người dùng
            if (!user) {
                throw new CustomError_1.default(constant_1.STATUS_CODES.UNAUTHORIZED, constant_1.MESSAGES.UNAUTHORIZED);
            }
            // Kiểm tra mật khẩu có khớp không
            const isPasswordValid = yield bcrypt_1.default.compare(pass, user.pass);
            // Nếu mật khẩu không khớp
            if (!isPasswordValid) {
                throw new CustomError_1.default(constant_1.STATUS_CODES.UNAUTHORIZED, constant_1.MESSAGES.UNAUTHORIZED);
            }
            // Tạo JWT token
            const token = (0, generateToken_1.generateToken)({
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
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield index_1.default.users.findMany({
                    include: {
                        userGroup: true,
                    },
                });
                return users;
            }
            catch (error) {
                throw new CustomError_1.default(constant_1.STATUS_CODES.NOT_FOUND, constant_1.MESSAGES.NOT_FOUND);
            }
        });
    }
    addUser(phone, pass, group) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!phone || !pass || !group) {
                throw new CustomError_1.default(constant_1.STATUS_CODES.BAD_REQUEST, constant_1.MESSAGES.BAD_REQUEST);
            }
            try {
                const userGroup = yield index_1.default.userGroups.findUnique({
                    where: { group_name: group },
                });
                if (!userGroup) {
                    throw new CustomError_1.default(constant_1.STATUS_CODES.BAD_REQUEST, constant_1.MESSAGES.BAD_REQUEST); // nếu nhóm không tồn tại thì báo lỗi
                }
                const hashedPass = yield bcrypt_1.default.hash(pass, 10);
                // tạo mới hoặc ghi đè thông tin người dùng
                const newUser = yield index_1.default.users.upsert({
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
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteUser(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!phone) {
                throw new CustomError_1.default(constant_1.STATUS_CODES.BAD_REQUEST, constant_1.MESSAGES.BAD_REQUEST);
            }
            try {
                // Xóa người dùng dựa trên số điện thoại
                const deletedUser = yield index_1.default.users.delete({
                    where: { phone: phone },
                });
                return deletedUser;
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                    error.code === "P2025") {
                    // Prisma error P2025: Record to delete does not exist
                    return new CustomError_1.default(constant_1.STATUS_CODES.NOT_FOUND, constant_1.MESSAGES.NOT_FOUND);
                }
                return new CustomError_1.default(constant_1.STATUS_CODES.INTERNAL_SERVER_ERROR, constant_1.MESSAGES.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
exports.userService = userService;

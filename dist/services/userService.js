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
            const token = (0, generateToken_1.generateToken)({ userId: user.id, group: user.userGroup.group_name });
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
    ;
}
exports.userService = userService;

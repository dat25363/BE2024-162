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
exports.checkPermission = void 0;
const getGroupPermission_1 = __importDefault(require("../utils/getGroupPermission"));
const getRequiredPermission_1 = __importDefault(require("../utils/getRequiredPermission"));
const constant_1 = require("../config/constant");
const CustomError_1 = __importDefault(require("../models/CustomError"));
// Định nghĩa kiểu dữ liệu cho payload của token người dùng
const checkPermission = (routeName) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user; // Lấy thông tin người dùng từ token
        // Kiểm tra xem người dùng có thuộc một nhóm hợp lệ không
        if (!user || !user.group) {
            const error = new CustomError_1.default(constant_1.STATUS_CODES.BAD_REQUEST, constant_1.MESSAGES.BAD_REQUEST);
            return next(error);
        }
        // Kiểm tra nếu nhóm tồn tại và có quyền cần thiết
        const permissions = yield (0, getGroupPermission_1.default)(user.group);
        const requiredPermission = yield (0, getRequiredPermission_1.default)(routeName);
        if (permissions &&
            requiredPermission &&
            requiredPermission.every((perm) => permissions.includes(perm))) {
            return next(); // Nếu người dùng có quyền, tiếp tục middleware
        }
        else {
            const error = new CustomError_1.default(constant_1.STATUS_CODES.FORBIDDEN, constant_1.MESSAGES.FORBIDDEN);
            return next(error);
        }
    });
};
exports.checkPermission = checkPermission;

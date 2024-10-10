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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.addUser = exports.getAllUser = exports.login = void 0;
const userService_1 = require("../services/userService");
const constant_1 = require("../config/constant");
const uService = new userService_1.userService();
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, pass } = req.body; // Lấy thông tin từ request body
    try {
        const user = yield uService.login(phone, pass); // Gọi service
        res.status(constant_1.STATUS_CODES.OK).json(user); // Trả về thông tin người dùng
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userList = yield uService.getAllUser(); // Gọi service
        res.status(constant_1.STATUS_CODES.OK).json(userList); // Trả về danh sách tất cả người dùng
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUser = getAllUser;
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, pass, group } = req.body;
    try {
        const user = yield uService.addUser(phone, pass, group); // Gọi service
        res.status(constant_1.STATUS_CODES.CREATED).json(user); // trả về tạo thành công
    }
    catch (error) {
        next(error);
    }
});
exports.addUser = addUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone } = req.body; // Lấy thông tin từ request body
    try {
        const user = yield uService.deleteUser(phone); // Gọi service
        res.status(constant_1.STATUS_CODES.OK).json(user); // Trả về xóa thành công
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;

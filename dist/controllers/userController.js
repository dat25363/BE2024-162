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
exports.login = void 0;
const userService_1 = require("../services/userService");
const uService = new userService_1.userService();
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phone, pass } = req.body; // Lấy thông tin từ request body
    try {
        const user = yield uService.login(phone, pass); // Gọi service
        res.status(200).json(user); // Trả về thông tin người dùng
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;

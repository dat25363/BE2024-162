"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateByToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../config/constant");
const CustomError_1 = __importDefault(require("../models/CustomError"));
const constant_2 = require("../config/constant");
// Middleware xác thực người dùng
const authenticateByToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Lấy token từ header
    if (!token) {
        const error = new CustomError_1.default(constant_1.STATUS_CODES.UNAUTHORIZED, constant_1.MESSAGES.UNAUTHORIZED);
        return next(error);
    }
    jsonwebtoken_1.default.verify(token, constant_2.TOKEN.SECRET_KEY || '', (err, decoded) => {
        if (err) {
            const error = new CustomError_1.default(constant_1.STATUS_CODES.UNAUTHORIZED, constant_1.MESSAGES.UNAUTHORIZED);
            return next(error);
        }
        if (decoded) {
            req.user = decoded; // Gán thông tin người dùng vào req
        }
        else {
            const error = new CustomError_1.default(constant_1.STATUS_CODES.UNAUTHORIZED, constant_1.MESSAGES.UNAUTHORIZED);
            return next(error);
        }
        next();
    });
};
exports.authenticateByToken = authenticateByToken;

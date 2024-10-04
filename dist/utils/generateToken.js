"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constant_1 = require("../config/constant");
// Hàm tạo token
const generateToken = (userData) => {
    return jsonwebtoken_1.default.sign(userData, constant_1.TOKEN.SECRET_KEY || "", { expiresIn: constant_1.TOKEN.EXPIRE_TIME });
};
exports.generateToken = generateToken;

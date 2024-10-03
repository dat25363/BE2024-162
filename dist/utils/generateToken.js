"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'secret-key';
// Hàm tạo token
const generateToken = (userData) => {
    return jsonwebtoken_1.default.sign(userData, SECRET_KEY, { expiresIn: '12h' });
};
// Ví dụ về cách sử dụng hàm tạo token
const token = generateToken({ id: 1, name: 'Tien Dat', group: 'USER' });
console.log(token); // In token ra console

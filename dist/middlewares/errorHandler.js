"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const constant_1 = require("../config/constant");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || constant_1.STATUS_CODES.INTERNAL_SERVER_ERROR; // Mặc định là 500 nếu không có statusCode
    const message = err.message;
    if (statusCode === constant_1.STATUS_CODES.INTERNAL_SERVER_ERROR) {
        return res.status(statusCode).json({
            message: constant_1.MESSAGES.INTERNAL_SERVER_ERROR,
        });
    }
    else {
        return res.status(statusCode).json({
            message: message,
        });
    }
};
exports.errorHandler = errorHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const constant_1 = require("../config/constant");
const constant_2 = require("../config/constant");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || constant_2.STATUS_CODES.INTERNAL_SERVER_ERROR; // Mặc định là 500 nếu không có statusCode
    const message = err.message || constant_1.Messages.INTERNAL_SERVER_ERROR;
    // Trả về phản hồi lỗi theo mã lỗi
    if (statusCode === constant_2.STATUS_CODES.BAD_REQUEST) {
        return res.status(constant_2.STATUS_CODES.BAD_REQUEST).json({ message: constant_1.Messages.BAD_REQUEST, error: message });
    }
    else if (statusCode === constant_2.STATUS_CODES.UNAUTHORIZED) {
        return res.status(constant_2.STATUS_CODES.UNAUTHORIZED).json({ message: constant_1.Messages.UNAUTHORIZED, error: message });
    }
    else if (statusCode === constant_2.STATUS_CODES.FORBIDDEN) {
        return res.status(constant_2.STATUS_CODES.FORBIDDEN).json({ message: constant_1.Messages.FORBIDDEN, error: message });
    }
    else {
        // Xử lý các lỗi khác
        return res
            .status(constant_2.STATUS_CODES.INTERNAL_SERVER_ERROR)
            .json({ message: constant_1.Messages.INTERNAL_SERVER_ERROR, error: message });
    }
};
exports.errorHandler = errorHandler;

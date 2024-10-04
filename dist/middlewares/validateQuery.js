"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = void 0;
const CustomError_1 = __importDefault(require("../models/CustomError"));
const constant_1 = require("../config/constant");
const validateQuery = (req, res, next) => {
    const { page, release_year_above, release_year_below, min_price, max_price } = req.query;
    if (page && (isNaN(Number(page)) || Number(page) <= 0)) {
        const error = new CustomError_1.default(constant_1.STATUS_CODES.BAD_REQUEST, constant_1.MESSAGES.BAD_REQUEST);
        return next(error); // Chuyển lỗi đến errorHandler xử lý
    }
    if (release_year_above) {
        if (isNaN(Number(release_year_above)) || Number(release_year_above) <= 0) {
            const error = new CustomError_1.default(constant_1.STATUS_CODES.BAD_REQUEST, constant_1.MESSAGES.BAD_REQUEST);
            return next(error);
        }
    }
    if (release_year_below) {
        if (isNaN(Number(release_year_below)) || Number(release_year_below) <= 0) {
            const error = new CustomError_1.default(constant_1.STATUS_CODES.BAD_REQUEST, constant_1.MESSAGES.BAD_REQUEST);
            return next(error);
        }
    }
    if (min_price) {
        if (isNaN(Number(min_price)) || Number(min_price) < 0) {
            const error = new CustomError_1.default(constant_1.STATUS_CODES.BAD_REQUEST, constant_1.MESSAGES.BAD_REQUEST);
        }
    }
    if (max_price) {
        if (isNaN(Number(max_price)) || Number(max_price) <= 0) {
            const error = new CustomError_1.default(constant_1.STATUS_CODES.BAD_REQUEST, constant_1.MESSAGES.BAD_REQUEST);
            return next(error);
        }
    }
    next();
};
exports.validateQuery = validateQuery;

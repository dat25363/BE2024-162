"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQuery = void 0;
const validateQuery = (req, res, next) => {
    const { page, release_year_above, release_year_below, min_price, max_price } = req.query;
    if (page && (isNaN(Number(page)) || Number(page) <= 0)) {
        const error = new Error("page need to be a number and greater than 0");
        error.statusCode = 400;
        return next(error); // Chuyển lỗi đến errorHandler xử lý
    }
    if (release_year_above) {
        if (isNaN(Number(release_year_above)) || Number(release_year_above) <= 0) {
            const error = new Error("release year need to be a number and greater than 0");
            error.statusCode = 400;
            return next(error);
        }
    }
    if (release_year_below) {
        if (isNaN(Number(release_year_below)) || Number(release_year_below) <= 0) {
            const error = new Error("release year need to be a number and greater than 0");
            error.statusCode = 400;
            return next(error);
        }
    }
    if (min_price) {
        if (isNaN(Number(min_price)) || Number(min_price) < 0) {
            const error = new Error("price need to be a number and equal or greater than 0");
            error.statusCode = 400;
            return next(error);
        }
    }
    if (max_price) {
        if (isNaN(Number(max_price)) || Number(max_price) <= 0) {
            const error = new Error("price need to be a number and equal or greater than 0");
            error.statusCode = 400;
            return next(error);
        }
    }
    next();
};
exports.validateQuery = validateQuery;

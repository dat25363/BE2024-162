"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
const permissions_groups_1 = require("../security/permissions-groups");
const checkGroupPermissions_1 = require("../utils/checkGroupPermissions");
const constant_1 = require("../config/constant");
// Middleware kiểm tra quyền
const checkPermission = (requiredPermission) => {
    return (req, res, next) => {
        const user = req.user; // Lấy thông tin người dùng từ token
        // Kiểm tra xem người dùng có thuộc một nhóm hợp lệ không
        if (!user || !user.group) {
            const error = new Error("invalid user or group");
            error.statusCode = constant_1.STATUS_CODES.FORBIDDEN;
            return next(error);
        }
        // Lấy thông tin nhóm người dùng từ tệp cấu hình
        const group = permissions_groups_1.Groups[user.group]; // Tìm nhóm của người dùng
        // Kiểm tra nếu nhóm tồn tại và có quyền cần thiết
        if (group && (0, checkGroupPermissions_1.checkGroupPermission)(group, requiredPermission)) {
            return next(); // Nếu người dùng có quyền, tiếp tục middleware
        }
        else {
            const error = new Error("Forbidden");
            error.statusCode = constant_1.STATUS_CODES.FORBIDDEN;
            return next(error);
        }
    };
};
exports.checkPermission = checkPermission;

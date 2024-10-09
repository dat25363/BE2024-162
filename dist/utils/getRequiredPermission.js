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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
function getRequiredPermission(routeName) {
    return __awaiter(this, void 0, void 0, function* () {
        const route = yield index_1.default.routes.findUnique({
            where: {
                route_name: routeName, // Tìm kiếm theo tên route
            },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    }
                }
            },
        });
        if (!route || !route.permissions) {
            return null; // Nếu không tìm thấy route hoặc không có quyền liên quan
        }
        // Trả về danh sách quyền dưới dạng mảng chuỗi
        return route.permissions.map((permissions) => permissions.permission.permission_name);
    });
}
exports.default = getRequiredPermission;

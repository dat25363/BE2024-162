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
function getGroupPermission(group_name) {
    return __awaiter(this, void 0, void 0, function* () {
        const group = yield index_1.default.userGroups.findUnique({
            where: {
                group_name: group_name,
            },
            include: {
                permissions: {
                    include: {
                        permission: true,
                    },
                },
            },
        });
        if (group) {
            const permissions = group.permissions.map((groupPermission) => groupPermission.permission.permission_name);
            return permissions;
        }
        else {
            return null;
        }
    });
}
exports.default = getGroupPermission;

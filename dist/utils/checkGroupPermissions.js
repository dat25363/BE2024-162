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
exports.checkGroupPermission = void 0;
const getGroupPermission_1 = __importDefault(require("./getGroupPermission"));
const checkGroupPermission = (groupName, requiredPermission) => __awaiter(void 0, void 0, void 0, function* () {
    const GroupPermissions = yield (0, getGroupPermission_1.default)();
    const permissionData = GroupPermissions.find((group) => group.group_name === groupName);
    if (permissionData &&
        permissionData.permissions.includes(requiredPermission)) {
        return true;
    }
    else {
        return false;
    }
});
exports.checkGroupPermission = checkGroupPermission;

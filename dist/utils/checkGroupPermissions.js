"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGroupPermission = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const permissionsFilePath = path_1.default.resolve(__dirname, "../../src/security/permissions.json");
const GroupPermissions = JSON.parse(fs_1.default.readFileSync(permissionsFilePath, "utf8"));
const checkGroupPermission = (groupName, requiredPermission) => {
    const permissionData = GroupPermissions.groups.find((group) => group.name === groupName);
    if (permissionData &&
        permissionData.permissions.includes(requiredPermission)) {
        return true;
    }
    else {
        return false;
    }
};
exports.checkGroupPermission = checkGroupPermission;

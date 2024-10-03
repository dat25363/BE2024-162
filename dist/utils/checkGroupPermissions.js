"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGroupPermission = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const permissions_groups_1 = require("../security/permissions-groups");
const permissionsFilePath = path_1.default.resolve(__dirname, "../../src/security/permissions.json");
const GroupPermissions = JSON.parse(fs_1.default.readFileSync(permissionsFilePath, "utf8"));
const checkGroupPermission = (groupName, requiredPermission) => {
    let permissionData = GroupPermissions.groups.find((group) => permissions_groups_1.Groups[group.name] === groupName);
    permissionData.permissions = permissionData.permissions.map((per) => permissions_groups_1.Permissions[per]);
    if (permissionData &&
        permissionData.permissions.includes(requiredPermission)) {
        return true;
    }
    else {
        return false;
    }
};
exports.checkGroupPermission = checkGroupPermission;

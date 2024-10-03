import fs from "fs";
import path from "path";
import { Groups, Permissions } from "../security/permissions-groups";
const permissionsFilePath = path.resolve(
  __dirname,
  "../../src/security/permissions.json"
);
const GroupPermissions = JSON.parse(
  fs.readFileSync(permissionsFilePath, "utf8")
);

export const checkGroupPermission = (
  groupName: string,
  requiredPermission: string
) => {
  let permissionData = GroupPermissions.groups.find(
    (group: any) => Groups[group.name] === groupName
  );
  permissionData.permissions = permissionData.permissions.map((per: string) => Permissions[per]);
  if (
    permissionData &&
    permissionData.permissions.includes(requiredPermission)
  ) {
    return true;
  } else {
    return false;
  }
};

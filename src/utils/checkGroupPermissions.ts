import fs from "fs";
import path from "path";
import {Group} from "../models/Group"

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
  const permissionData = GroupPermissions.groups.find(
    (group: Group) => group.name === groupName
  );
 
  if (
    permissionData &&
    permissionData.permissions.includes(requiredPermission)
  ) {
    return true;
  } else {
    return false;
  }
};

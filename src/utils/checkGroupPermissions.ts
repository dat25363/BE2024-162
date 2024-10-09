import { UserGroup } from "../models/UserGroup";
import getGroupPermission from "./getGroupPermission";

export const checkGroupPermission = async (
  groupName: string,
  requiredPermission: string
) => {
  const GroupPermissions: UserGroup[] = await getGroupPermission();
  const permissionData = GroupPermissions.find(
    (group: UserGroup) => group.group_name === groupName
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

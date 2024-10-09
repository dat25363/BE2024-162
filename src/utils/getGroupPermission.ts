import prismaClient from "../index";
import { UserGroup } from "../models/UserGroup";

async function getGroupPermission() {
  const groups = await prismaClient.userGroups.findMany({
    include: {
      permissions: {
        include: {
          permission: true,
        },
      },
    },
  });

  const formattedGroups: UserGroup[] = groups.map((group) => ({
    group_name: group.group_name,
    permissions: group.permissions.map(
      (groupPermission) => groupPermission.permission.permission
    ),
  }));

  return formattedGroups;
}

export default getGroupPermission;

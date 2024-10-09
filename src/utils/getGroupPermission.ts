import prismaClient from "../index";

async function getGroupPermission(group_name: string) {
  const group = await prismaClient.userGroups.findUnique({
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
    const permissions = group.permissions.map(
      (groupPermission) => groupPermission.permission.permission_name
    );
    return permissions;
  } else {
    return null;
  }
}

export default getGroupPermission;

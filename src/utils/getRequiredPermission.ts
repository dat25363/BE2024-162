import prismaClient from "../index";

async function getRequiredPermission(
  routeName: string
): Promise<string[] | null> {
  const route = await prismaClient.routes.findUnique({
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
  return route.permissions.map(
    (permissions) => permissions.permission.permission_name
  );
}

export default getRequiredPermission;

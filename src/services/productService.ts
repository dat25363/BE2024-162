import { PrismaClient, Products } from "@prisma/client";
import prismaClient from "../index";
import { ProductInterface } from "../interfaces/productInterface";
import getImageUrl from "../utils/getImageUrl";
import { SearchParams } from "../models/Product";

export class ProductService implements ProductInterface {
  async productSearch(
    params: SearchParams
  ): Promise<{ total: number; Products: any[] }> {
    const {
      keyword,
      page = 1,
      city,
      condition,
      brand,
      release_year_above,
      release_year_below,
      min_price,
      max_price,
    } = params;
    const itemsPerPage = 9;
    const offset = (Number(page) - 1) * itemsPerPage;

    const where: any = { isSold: false };

    if (keyword)
      where.product_name = { contains: keyword, mode: "insensitive" };
    if (brand) where.brand = { brand_name: brand };
    if (city) where.city = city;
    if (condition) where.p_condition = condition;
    if (release_year_above) where.release_year = { gte: release_year_above };
    if (release_year_below) where.release_year = { lte: release_year_below };
    if (min_price) where.price = { gte: min_price };
    if (max_price) where.price = { lte: max_price };

    const [results, total] = await Promise.all([
      prismaClient.products.findMany({
        where,
        skip: offset,
        take: itemsPerPage,
        include: { brand: true },
      }),
      prismaClient.products.count({ where }),
    ]);

    const promises = results.map(async (product) => {
      const imgUrl = await getImageUrl(product.img);
      return { ...product, img: imgUrl };
    });

    const updatedDevices = await Promise.all(promises);

    return { total: total, Products: updatedDevices };
  }
}

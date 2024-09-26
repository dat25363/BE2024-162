import express, { Request, Response } from "express";
import db from "./db";
import getImageUrl from "./get-img-firebase";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const {
    keyword,
    page = 1,
    city,
    condition,
    brand,
    release_year,
    max_price,
  }: {
    keyword?: string;
    page?: number;
    city?: string;
    condition?: string;
    brand?: string;
    release_year?: number;
    max_price?: number;
  } = req.query; 

  const itemsPerPage = 9; // Số lượng thiết bị mỗi trang
  const offset = (Number(page) - 1) * itemsPerPage;
  const queryConditions: string[] = [];
  const queryParams: any[] = []; // Mảng chứa các tham số cho truy vấn

  if (keyword) {
    queryConditions.push("products.product_name LIKE ?");
    queryParams.push(`%${keyword}%`); 
  }

  if (city) {
    queryConditions.push("products.city = ?");
    queryParams.push(city);
  }
  if (condition) {
    queryConditions.push("products.p_condition = ?");
    queryParams.push(condition);
  }
  if (brand) {
    queryConditions.push("products.brand_id = ?");
    queryParams.push(brand);
  }
  if (release_year) {
    queryConditions.push("products.release_year = ?");
    queryParams.push(release_year);
  }
  if (max_price) {
    queryConditions.push("products.price <= ?");
    queryParams.push(max_price);
  }

  const whereClause =
    queryConditions.length > 0 ? "AND " + queryConditions.join(" AND ") : "";
  
  // Thêm itemsPerPage và offset vào queryParams
  queryParams.push(itemsPerPage, offset);

  // Truy vấn để lấy danh sách thiết bị thỏa mãn
  const getProductQuery = `
      SELECT products.*, brands.brand_name AS brand_name
      FROM products 
      JOIN brands ON products.brand_id = brands.id
      WHERE products.isSold = 0 ${whereClause}
      LIMIT ? OFFSET ?;
    `;
  
  const getTotalQuery = `
      SELECT COUNT(*) AS count
      FROM products 
      JOIN brands ON products.brand_id = brands.id
      WHERE products.isSold = 0 ${whereClause};
    `;

  db.query(getProductQuery, queryParams, async (err, results: any[]) => {
    if (err) {
      console.error("Error searching products:", err);
      return res.status(500).send("Error searching products");
    }

    // Truy vấn để lấy số lượng thiết bị tìm thấy
    db.query(getTotalQuery, queryParams.slice(0, -2), (err, countResult: any[]) => {
        if (err) {
          console.error("Error fetching count:", err);
          return res.status(500).send("Error fetching count");
        }

        const totalCount = countResult[0]?.count || 0;

        // Thay thế URL ảnh
        const promises = results.map(async (device) => {
          const imgUrl = await getImageUrl(device.img);
          return {
            ...device,
            img: imgUrl,
          };
        });

        Promise.all(promises).then((updatedDevices) => {
          res.status(200).json({
            count: totalCount,
            devices: updatedDevices,
          });
        });
      }
    );
  });
});

export default router;

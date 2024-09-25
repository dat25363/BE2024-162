import express, { Request, Response } from "express";
import db from "./db"; 
import getImageUrl from "./get-img-firebase";

const router = express.Router();

router.get("/:keyword/:page?", async (req: Request, res: Response) => {
  const { keyword, page = 1 } = req.params; 
  const itemsPerPage = 9; // Số lượng thiết bị mỗi trang
  const offset = (Number(page) - 1) * itemsPerPage; 

  // Truy vấn để lấy danh sách thiết bị thỏa mãn
  const query = `
    SELECT SQL_CALC_FOUND_ROWS thietbi.*, thuonghieu.name AS brand_name
    FROM thietbi 
    JOIN thuonghieu ON thietbi.id_thuonghieu = thuonghieu.id
    WHERE thietbi.name LIKE ? AND thietbi.sold = 0
    LIMIT ? OFFSET ?;
  `;

  db.query(query, [`%${keyword}%`, itemsPerPage, offset], async (err, results: any[]) => {
    if (err) {
      console.error("Error searching products:", err);
      return res.status(500).send("Error searching products");
    }

    // Truy vấn để lấy số lượng thiết bị tìm thấy
    db.query("SELECT FOUND_ROWS() AS count", (err, countResult: any[]) => {
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

      Promise.all(promises).then(updatedDevices => {
        res.status(200).json({
          count: totalCount,
          devices: updatedDevices, 
        });
      });
    });
  });
});

export default router;

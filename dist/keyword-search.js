"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const get_img_firebase_1 = __importDefault(require("./get-img-firebase"));
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword, page = 1, city, condition, brand, release_year, max_price, } = req.query;
    const itemsPerPage = 9; // Số lượng thiết bị mỗi trang
    const offset = (Number(page) - 1) * itemsPerPage;
    const queryConditions = [];
    const queryParams = []; // Mảng chứa các tham số cho truy vấn
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
    const whereClause = queryConditions.length > 0 ? "AND " + queryConditions.join(" AND ") : "";
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
    db_1.default.query(getProductQuery, queryParams, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error("Error searching products:", err);
            return res.status(500).send("Error searching products");
        }
        // Truy vấn để lấy số lượng thiết bị tìm thấy
        db_1.default.query(getTotalQuery, queryParams.slice(0, -2), (err, countResult) => {
            var _a;
            if (err) {
                console.error("Error fetching count:", err);
                return res.status(500).send("Error fetching count");
            }
            const totalCount = ((_a = countResult[0]) === null || _a === void 0 ? void 0 : _a.count) || 0;
            // Thay thế URL ảnh
            const promises = results.map((device) => __awaiter(void 0, void 0, void 0, function* () {
                const imgUrl = yield (0, get_img_firebase_1.default)(device.img);
                return Object.assign(Object.assign({}, device), { img: imgUrl });
            }));
            Promise.all(promises).then((updatedDevices) => {
                res.status(200).json({
                    count: totalCount,
                    devices: updatedDevices,
                });
            });
        });
    }));
}));
exports.default = router;

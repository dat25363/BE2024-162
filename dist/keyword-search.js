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
router.get("/:keyword/:page?", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    db_1.default.query(query, [`%${keyword}%`, itemsPerPage, offset], (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.error("Error searching products:", err);
            return res.status(500).send("Error searching products");
        }
        // Truy vấn để lấy số lượng thiết bị tìm thấy
        db_1.default.query("SELECT FOUND_ROWS() AS count", (err, countResult) => {
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
            Promise.all(promises).then(updatedDevices => {
                res.status(200).json({
                    count: totalCount,
                    devices: updatedDevices,
                });
            });
        });
    }));
}));
exports.default = router;

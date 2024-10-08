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
exports.ProductService = void 0;
const index_1 = __importDefault(require("../index"));
const getImageUrl_1 = __importDefault(require("../utils/getImageUrl"));
class ProductService {
    productSearch(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { keyword, page = 1, city, condition, brand, release_year_above, release_year_below, min_price, max_price, } = params;
            const itemsPerPage = 9;
            const offset = (Number(page) - 1) * itemsPerPage;
            const where = { isSold: false };
            if (keyword)
                where.product_name = { contains: keyword.toLowerCase() };
            if (brand)
                where.brand = { brand_name: brand };
            if (city)
                where.city = city;
            if (condition)
                where.p_condition = condition;
            if (release_year_above)
                where.release_year = { gte: Number(release_year_above) };
            if (release_year_below)
                where.release_year = { lte: Number(release_year_below) };
            if (min_price)
                where.price = { gte: Number(min_price) };
            if (max_price)
                where.price = { lte: Number(max_price) };
            const [results, total] = yield Promise.all([
                index_1.default.products.findMany({
                    where,
                    skip: offset,
                    take: itemsPerPage,
                    include: { brand: true },
                }),
                index_1.default.products.count({ where }),
            ]);
            const promises = results.map((product) => __awaiter(this, void 0, void 0, function* () {
                const imgUrl = yield (0, getImageUrl_1.default)(product.img);
                return Object.assign(Object.assign({}, product), { img: imgUrl });
            }));
            const updatedDevices = yield Promise.all(promises);
            return { total: total, Products: updatedDevices };
        });
    }
}
exports.ProductService = ProductService;

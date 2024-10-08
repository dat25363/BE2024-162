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
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const client_1 = require("@prisma/client");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const constant_1 = require("./config/constant");
// Tạo instance của PrismaClient và Express
const app = (0, express_1.default)();
const prismaClient = new client_1.PrismaClient();
// Load file swagger.yaml từ thư mục swagger
const swaggerDocument = yamljs_1.default.load(path_1.default.resolve(__dirname, "../swagger.yaml"));
// Kết nối với cơ sở dữ liệu Prisma
prismaClient.$connect()
    .then(() => console.log("Database connected!"))
    .catch(err => console.error("Failed to connect to the database:", err));
// Sử dụng CORS middleware
app.use((0, cors_1.default)());
// xử lý body JSON
app.use(express_1.default.json());
// Cấu hình Swagger UI
app.use(constant_1.Routes.SWAGGER, swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
// Sử dụng các route
app.use(constant_1.Routes.API, productRoutes_1.default);
app.use(constant_1.Routes.API, userRoutes_1.default);
//middleware xử lý lỗi
app.use(errorHandler_1.errorHandler);
// Khởi động server
app.listen(constant_1.PORT, () => {
    console.log(`Server is running on http://localhost:${constant_1.PORT}`);
    console.log(`Swagger docs are available on http://localhost:${constant_1.PORT}/api-docs`);
});
// Ngắt kết nối Prisma khi dừng server
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prismaClient.$disconnect();
    console.log("Database disconnected.");
    process.exit(0);
}));
exports.default = prismaClient;

import express from 'express';
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { PrismaClient } from '@prisma/client'; 
import productRoute from "./routes/productRoutes";
import userRoute from "./routes/userRoutes";
import { errorHandler } from './middlewares/errorHandler';
import {Routes, PORT} from "./config/constant";


// Tạo instance của PrismaClient và Express
const app = express();
const prismaClient = new PrismaClient();

// Load file swagger.yaml từ thư mục swagger
const swaggerDocument = YAML.load(path.resolve(__dirname, "../swagger.yaml"));

// Kết nối với cơ sở dữ liệu Prisma
prismaClient.$connect()
  .then(() => console.log("Database connected!"))
  .catch(err => console.error("Failed to connect to the database:", err));

// Sử dụng CORS middleware
app.use(cors());

// xử lý body JSON
app.use(express.json());

// Cấu hình Swagger UI
app.use(Routes.SWAGGER, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Sử dụng các route
app.use(Routes.API_SEARCH_PRODUCT, productRoute);
app.use(Routes.API_LOGIN, userRoute);

//middleware xử lý lỗi
app.use(errorHandler);

// Khởi động server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs are available on http://localhost:${PORT}/api-docs`);
});

// Ngắt kết nối Prisma khi dừng server
process.on('SIGINT', async () => {
  await prismaClient.$disconnect();
  console.log("Database disconnected.");
  process.exit(0);
});

export default prismaClient;

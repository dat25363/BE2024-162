import express from 'express';
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { PrismaClient } from '@prisma/client'; 
import productRoute from "./routes/productRoutes";
import { errorHandler } from './middlewares/errorHandler';
import { authenticateByToken } from './middlewares/auth';
import {Routes, USER_DATA, PORT} from "./config/constant";
import { generateToken } from './utils/generateToken';


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

// Cấu hình Swagger UI
app.use(Routes.SWAGGER, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//middleware xác thực token
app.use(authenticateByToken);

// Sử dụng các route cho product search
app.use(Routes.API_SEARCH_PRODUCT, productRoute);

//middleware xử lý lỗi
app.use(errorHandler);

// Khởi động server
const token = generateToken({ id: USER_DATA.ID, name: USER_DATA.NAME, group: USER_DATA.GROUP });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs are available on http://localhost:${PORT}/api-docs`);
  console.log(`Token: ${token}`); 
});

// Ngắt kết nối Prisma khi dừng server
process.on('SIGINT', async () => {
  await prismaClient.$disconnect();
  console.log("Database disconnected.");
  process.exit(0);
});

export default prismaClient;

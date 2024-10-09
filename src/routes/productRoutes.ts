import express from "express";
import { searchProducts } from "../controllers/productController";
import { validateQuery } from "../middlewares/validateQuery";
import { checkPermission } from "../middlewares/checkPermission";
import { Permissions } from "../config/constant";
import { Routes } from "../config/constant";
import { authenticateByToken } from '../middlewares/auth';

const router = express.Router();

router.get(
  Routes.ROOT,
  authenticateByToken,
  checkPermission(Permissions.VIEW_PRODUCTS),
  validateQuery,
  searchProducts
);


export default router;
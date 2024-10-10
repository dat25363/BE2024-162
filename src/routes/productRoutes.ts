import express from "express";
import { searchProducts } from "../controllers/productController";
import { validateQuery } from "../middlewares/validateQuery";
import { checkPermission } from "../middlewares/checkPermission";
import { routeName } from "../config/constant";
import { Routes } from "../config/constant";
import { authenticateByToken } from '../middlewares/auth';

const router = express.Router();

router.get(
  Routes.SEARCH_PRODUCT,
  authenticateByToken,
  checkPermission(routeName.SEARCH_PRODUCT),
  validateQuery,
  searchProducts
);


export default router;
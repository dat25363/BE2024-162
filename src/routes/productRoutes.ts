import express from "express";
import { searchProducts } from "../controllers/productController";
import { validateQuery } from "../middlewares/validateQuery";
import { checkPermission } from "../middlewares/checkPermission";
import {Permissions} from '../security/permissions-groups'
import {Routes} from "../config/constant";

const router = express.Router();

router.get(Routes.ROOT, checkPermission(Permissions.VIEW_PRODUCTS), validateQuery, searchProducts);

export default router;
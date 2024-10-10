"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const validateQuery_1 = require("../middlewares/validateQuery");
const checkPermission_1 = require("../middlewares/checkPermission");
const constant_1 = require("../config/constant");
const constant_2 = require("../config/constant");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.get(constant_2.Routes.SEARCH_PRODUCT, auth_1.authenticateByToken, (0, checkPermission_1.checkPermission)(constant_1.routeName.SEARCH_PRODUCT), validateQuery_1.validateQuery, productController_1.searchProducts);
exports.default = router;
